import { useState } from "react";

interface Props {
  mode: "view" | "edit";
  data: { name: string; reason: string };
  onClose: () => void;
  onSave?: (newReason: string) => void; // Only used in edit mode
}

const ViewEditModal = ({ mode, data, onClose, onSave }: Props) => {
  const [reason, setReason] = useState(data.reason);

  const isView = mode === "view";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-[400px]">
        <h2 className="text-lg font-bold mb-4 capitalize">
          {mode} Favorite Package
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Package Name</label>
          <input
            type="text"
            className="border w-full p-2 rounded bg-gray-100"
            value={data.name}
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Reason</label>
          <textarea
            className={`border w-full p-2 rounded ${
              isView ? "bg-gray-100" : ""
            }`}
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            disabled={isView}
          />
        </div>

        <div className="flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            {isView ? "Close" : "Cancel"}
          </button>
          {!isView && (
            <button
              onClick={() => onSave && onSave(reason)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewEditModal;
