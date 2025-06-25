import { useEffect, useState } from "react";
import {
  Card,
  CardContent
} from "@/components/ui/card";

const API = "https://wms-audit-backend.onrender.com/api";

const sections = [
  { key: "audit/mismatches", title: "Inventory Mismatches" },
  { key: "orders/pending-pick", title: "Pending Pick Orders" },
  { key: "orders/ready-for-delivery", title: "Ready for Delivery Orders" },
  { key: "returns/pending-restock", title: "Returns Pending Restock" },
];

export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    sections.forEach((section) => {
      fetch(`${API}/${section.key}`)
        .then((res) => res.json())
        .then((json) => {
          setData((prev) => ({ ...prev, [section.key]: json }));
        });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">WMS Audit Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <Card key={section.key}>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              {data[section.key] ? (
                data[section.key].length === 0 ? (
                  <p className="text-sm text-gray-500">No records.</p>
                ) : (
                  <ul className="text-sm space-y-1">
                    {data[section.key].map((item, idx) => (
                      <li key={idx} className="bg-white rounded p-2 shadow">
                        {JSON.stringify(item)}
                      </li>
                    ))}
                  </ul>
                )
              ) : (
                <p className="text-sm text-gray-400">Loading...</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
