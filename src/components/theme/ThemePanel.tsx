import { ThemePicker } from '..';
import { Modal } from '../ui/Modal';

interface ThemePanelProps {
  showModal: boolean;
  closeAction: React.MouseEventHandler<HTMLElement>;
}

export const ThemePanel = ({ showModal, closeAction }: ThemePanelProps) => {
  return (
    <Modal show={showModal} title="Theme" closeAction={closeAction}>
      <ThemePicker />
    </Modal>
  );
};
