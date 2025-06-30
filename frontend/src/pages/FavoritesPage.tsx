import { useEffect, useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import ViewEditModal from "../components/ViewEditModal";
import { useNavigate } from "react-router-dom";
import type { Favorite } from "../types";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState<string | null>(null);

  const [viewEditData, setViewEditData] = useState<Favorite | null>(null);
  const [viewEditMode, setViewEditMode] = useState<"view" | "edit">("view");

  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const handleDelete = (name: string) => {
    setSelectedToDelete(name);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updated = favorites.filter((f) => f.name !== selectedToDelete);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setShowDeleteModal(false);
    setSelectedToDelete(null);
  };

  const handleView = (fav: Favorite) => {
    setViewEditData(fav);
    setViewEditMode("view");
  };

  const handleEdit = (fav: Favorite) => {
    setViewEditData(fav);
    setViewEditMode("edit");
  };

  const handleSaveEdit = (newReason: string) => {
    const updated = favorites.map((f) =>
      f.name === viewEditData?.name ? { ...f, reason: newReason } : f
    );
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setViewEditData(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-3xl w-full border rounded p-6">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to Favorite NPM Packages
        </h1>

        {favorites.length === 0 ? (
          <div className="border p-8 text-center">
            <p className="mb-4">You don’t have any favs yet. Please add.</p>
            <Button label="Add Fav" onClick={() => navigate("/")} />
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <Button label="Add Fav" onClick={() => navigate("/")} />
            </div>
            <table className="w-full border">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Package Name</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {favorites.map((fav) => (
                  <tr key={fav.name}>
                    <td className="border px-4 py-2">{fav.name}</td>
                    <td className="border px-4 py-2 flex gap-2 justify-center">
                      <Button label="View" onClick={() => handleView(fav)} />
                      <Button label="Edit" onClick={() => handleEdit(fav)} />
                      <Button
                        label="Delete"
                        onClick={() => handleDelete(fav.name)}
                        color="red"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {showDeleteModal && selectedToDelete && (
          <Modal
            title="Are you sure you want to delete?"
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={confirmDelete}
          />
        )}

        {viewEditData && (
          <ViewEditModal
            mode={viewEditMode}
            data={viewEditData}
            onClose={() => setViewEditData(null)}
            onSave={viewEditMode === "edit" ? handleSaveEdit : undefined}
          />
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
