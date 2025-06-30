interface Props {
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const Modal = ({ title, onCancel, onConfirm }: Props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg mb-4">{title}</h2>
        <div className="flex gap-4 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
