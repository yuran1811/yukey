import { useStore } from '@/store';
import { Modal } from '../ui/Modal';
import { SettingItem } from './SettingItem';

interface SettingsPanelProps {
  showModal: boolean;
  closeAction: React.MouseEventHandler<HTMLElement>;
}

export const SettingsPanel = ({
  showModal,
  closeAction,
}: SettingsPanelProps) => {
  const settings = useStore((state) => state.settings);
  const setSettings = useStore((state) => state.setSettings);

  return (
    <Modal show={showModal} title="Settings" closeAction={closeAction}>
      <div className="!pointer-events-auto flex size-full flex-col items-end justify-start gap-3 overflow-y-auto p-3">
        <SettingItem
          type="input-number"
          id={'maxCharToShow'}
          label={'Max char showing'}
          value={settings.maxCharToShow}
          defaultValue={5}
          minValue={1}
          maxValue={8}
          onChange={(e) =>
            setSettings({ ...settings, maxCharToShow: +e.target.value })
          }
        />
        <SettingItem
          type="switch"
          id={'mergeDuplicates'}
          state={settings.mergeDuplicates}
          label={'Merge duplicate chars'}
          onChange={() =>
            setSettings({
              ...settings,
              mergeDuplicates: !settings.mergeDuplicates,
            })
          }
        />
        <SettingItem
          type="switch"
          id={'showButtonStroke'}
          state={settings.showButtonStroke}
          label={'Show button stroke'}
          onChange={() =>
            setSettings({
              ...settings,
              showButtonStroke: !settings.showButtonStroke,
            })
          }
        />
      </div>

      <div className="absolute top-0 right-0 left-0 mx-1 h-6 bg-gradient-to-b from-[hsl(var(--primary))] to-transparent" />
      <div className="absolute right-0 bottom-0 left-0 mx-1 h-6 rounded-b-2xl bg-gradient-to-t from-[hsl(var(--primary))] to-transparent" />
    </Modal>
  );
};
