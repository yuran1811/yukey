#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod input_listener;

use tauri::Manager;
use tauri::{CustomMenuItem, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem};

#[derive(Clone, serde::Serialize)]
struct InputPayload {
    mode: String,
    message: String,
}

fn init_tray_menu() -> SystemTray {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let hide = CustomMenuItem::new("show/hide".to_string(), "Hide");

    let tray_menu = SystemTrayMenu::new()
        .add_item(quit)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(hide);

    SystemTray::new().with_menu(tray_menu)
}

fn main() {
    let system_tray = init_tray_menu();

    tauri::Builder::default()
        .setup(move |app| {
            let window = app.get_window("main").unwrap();

            std::thread::spawn(move || {
                input_listener::run_listener(move |s: &str, s1: &str| {
                    if let Err(err) = window.emit(
                        "input_press",
                        InputPayload {
                            mode: String::from(s),
                            message: String::from(s1),
                        },
                    ) {
                        eprintln!("Error while emitting key event: {:?}", err);
                    }
                });
            });

            Ok(())
        })
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| {
            let window = app.get_window("main").unwrap();

            match event {
                SystemTrayEvent::DoubleClick { .. } => {
                    if window.is_visible().unwrap() {
                        return;
                    }

                    window.show().unwrap();
                    app.tray_handle()
                        .get_item("show/hide")
                        .set_title("Hide")
                        .unwrap();
                }
                SystemTrayEvent::MenuItemClick { id, .. } => {
                    let item_handle = app.tray_handle().get_item(&id);

                    match id.as_str() {
                        "quit" => {
                            std::process::exit(0);
                        }
                        "show/hide" => {
                            if window.is_visible().unwrap() {
                                window.hide().unwrap();
                                item_handle.set_title("Show").unwrap();
                            } else {
                                window.show().unwrap();
                                item_handle.set_title("Hide").unwrap();
                            }
                        }
                        _ => {}
                    }
                }
                _ => {}
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
