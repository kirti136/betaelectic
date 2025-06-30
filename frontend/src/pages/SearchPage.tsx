import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import type { Favorite, NpmPackage } from "../types";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NpmPackage[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [reason, setReason] = useState("");
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (query.length > 2) {
      fetch(`https://registry.npmjs.org/-/v1/search?text=${query}`)
        .then((res) => res.json())
        .then((data) => {
          const pkgs = data.objects.map((item: any) => ({
            name: item.package.name,
            description: item.package.description,
          }));
          setResults(pkgs);
        });
    }
  }, [query]);

  const handleSubmit = () => {
    if (!selected) return alert("Please select a package.");
    if (!reason.trim()) return alert("Please enter a reason.");
    if (favorites.some((f) => f.name === selected))
      return alert("Package already in favorites.");

    const newFav = { name: selected, reason };
    const updated = [...favorites, newFav];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    navigate("/favorites");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full border rounded p-6">
        <h1 className="text-2xl font-bold mb-4">Search for NPM Packages</h1>
        <Input
          label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search NPM..."
        />
        <div className="mt-4">
          <p className="font-medium mb-2">Results</p>

          <div className="h-[200px] overflow-y-auto border rounded p-2">
            {results.length === 0 ? (
              <p className="text-sm text-gray-500">No results</p>
            ) : (
              results.map((pkg) => (
                <div key={pkg.name} className="flex items-center gap-2 mb-1">
                  <input
                    type="radio"
                    id={pkg.name}
                    name="package"
                    value={pkg.name}
                    checked={selected === pkg.name}
                    onChange={() => setSelected(pkg.name)}
                  />
                  <label htmlFor={pkg.name} className="cursor-pointer">
                    <span className="font-semibold">{pkg.name}</span> —{" "}
                    <span className="text-sm">{pkg.description}</span>
                  </label>
                </div>
              ))
            )}
          </div>
        </div>

        <Textarea
          label="Why is this your fav?"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="flex justify-end mt-4">
          <Button onClick={handleSubmit} label="Submit" />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
