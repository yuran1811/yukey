#[cfg_attr(mobile, tauri::mobile_entry_point)]
mod input_listener;

use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Emitter, EventTarget, Manager,
};

#[derive(Clone, serde::Serialize)]
struct InputPayload {
    mode: String,
    message: String,
}

pub fn run() {
    let _app = tauri::Builder::default()
        .setup(|app| {
            let quit_i = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
            let show_i = MenuItem::with_id(app, "show", "Show", true, None::<&str>)?;
            let hide_i = MenuItem::with_id(app, "hide", "Hide", true, None::<&str>)?;
            let menu = Menu::with_items(app, &[&quit_i, &show_i, &hide_i])?;

            let _tray = TrayIconBuilder::new()
                .icon(app.default_window_icon().unwrap().clone())
                .menu(&menu)
                .show_menu_on_left_click(true)
                .build(app)?;

            let window = app.get_webview_window("main").unwrap();
            std::thread::spawn(move || {
                input_listener::run_listener(move |s: &str, s1: &str| {
                    if let Err(err) = window.emit_filter(
                        "input-press",
                        InputPayload {
                            mode: String::from(s),
                            message: String::from(s1),
                        },
                        |t| match t {
                            EventTarget::WebviewWindow { label } => label == "main",
                            _ => false,
                        },
                    ) {
                        eprintln!("Error while emitting key event: {:?}", err);
                    }
                });
            });

            Ok(())
        })
        .on_menu_event(|app, event| match event.id.as_ref() {
            "quit" => {
                app.exit(0);
            }
            "show" => {
                let window = app.get_webview_window("main").unwrap();
                let _ = window.show();
                let _ = window.set_focus();
            }
            "hide" => {
                let window = app.get_webview_window("main").unwrap();
                let _ = window.hide();
            }
            _ => {}
        })
        .on_tray_icon_event(|tray, event| match event {
            TrayIconEvent::Click {
                button: MouseButton::Left,
                button_state: MouseButtonState::Up,
                ..
            } => {
                // show and focus the main window when the tray is clicked
                let app = tray.app_handle();
                if let Some(window) = app.get_webview_window("main") {
                    let _ = window.show();
                    let _ = window.set_focus();
                }
            }
            _ => {}
        })
        .run(tauri::generate_context!());
}
