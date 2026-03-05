import { useState } from "react";
import { carsData } from "@/data/cars";
import { ArrowLeftRight, Plus, X } from "lucide-react";

const ComparePage = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const addCar = (id: string) => {
    if (selected.length < 3 && !selected.includes(id)) setSelected([...selected, id]);
  };

  const removeCar = (id: string) => setSelected(selected.filter(s => s !== id));

  const cars = selected.map(id => carsData.find(c => c.id === id)!).filter(Boolean);
  const specs = ["price", "fuel", "transmission", "seats", "mileage", "year", "ac", "gps", "bluetooth", "insurance", "rating"] as const;

  const formatVal = (car: typeof carsData[0], key: string) => {
    const v = (car as any)[key];
    if (typeof v === "boolean") return v ? "✓" : "✗";
    if (key === "price") return `$${v}/day`;
    return String(v);
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8">
      <div className="container">
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-2">Compare <span className="gold-text">Cars</span></h1>
          <p className="text-muted-foreground">Select up to 3 cars to compare side by side</p>
        </div>

        {/* Car Selector */}
        <div className="glass-card p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <ArrowLeftRight className="w-5 h-5 text-primary" />
            <h3 className="font-display font-semibold">Select Cars</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {carsData.map(car => (
              <button
                key={car.id}
                onClick={() => selected.includes(car.id) ? removeCar(car.id) : addCar(car.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selected.includes(car.id) ? "gold-gradient text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
              >
                {car.name} {selected.includes(car.id) && <X className="w-3 h-3 inline ml-1" />}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        {cars.length >= 2 ? (
          <div className="glass-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-muted-foreground font-medium">Feature</th>
                  {cars.map(car => (
                    <th key={car.id} className="p-4 text-center">
                      <img src={car.image} alt={car.name} className="w-full h-28 object-cover rounded-xl mb-2" />
                      <p className="font-display font-semibold">{car.name}</p>
                      <p className="text-xs text-muted-foreground">{car.brand}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specs.map(spec => (
                  <tr key={spec} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="p-4 text-muted-foreground capitalize font-medium">{spec === "ac" ? "A/C" : spec}</td>
                    {cars.map(car => (
                      <td key={car.id} className="p-4 text-center font-medium">{formatVal(car, spec)}</td>
                    ))}
                  </tr>
                ))}
                <tr className="border-b border-border/50">
                  <td className="p-4 text-muted-foreground font-medium">Features</td>
                  {cars.map(car => (
                    <td key={car.id} className="p-4 text-center">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {car.features.map(f => <span key={f} className="bg-secondary text-xs px-2 py-1 rounded-lg">{f}</span>)}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <Plus className="w-12 h-12 mx-auto mb-4 text-primary/30" />
            <p className="text-lg">Select at least 2 cars to compare</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparePage;
