import StudentLayout from "@/layouts/StudentLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const orders = [
  {
    id: "ORD-1001",
    course: "React Mastery",
    date: "2026-06-10",
    price: "$89.99",
    status: "Paid",
  },
  {
    id: "ORD-1002",
    course: "Node.js Backend",
    date: "2026-06-15",
    price: "$59.99",
    status: "Paid",
  },
  {
    id: "ORD-1003",
    course: "UI/UX Fundamentals",
    date: "2026-06-20",
    price: "$39.99",
    status: "Pending",
  },
];

const OrderHistoryPage = () => {
  return (
    <StudentLayout>
      <div className="space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-black">Order History</h1>
          <p className="text-muted-foreground mt-2">
            Track your course purchases and payments.
          </p>
        </div>

        {/* TABLE */}
        <div className="border rounded-2xl overflow-hidden bg-background">

          <div className="grid grid-cols-5 p-4 text-sm font-semibold border-b bg-muted/30">
            <span>Order ID</span>
            <span>Course</span>
            <span>Date</span>
            <span>Price</span>
            <span>Status</span>
          </div>

         {orders.map((order) => (
  <div
    key={order.id}
    className="grid grid-cols-5 items-center p-4 text-sm border-b hover:bg-muted/30 transition"
  >
    {/* ORDER ID + IMAGE */}
    <div className="flex items-center gap-3 font-medium">
      <img
        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
        alt="order"
        className="w-9 h-9 rounded-lg object-cover"
      />
      <span>{order.id}</span>
    </div>

    {/* COURSE */}
    <span>{order.course}</span>

    {/* DATE */}
    <span className="text-muted-foreground">{order.date}</span>

    {/* PRICE */}
    <span className="font-semibold">{order.price}</span>

    {/* STATUS */}
    <span>
      <Badge
        className={
          order.status === "Paid"
            ? "bg-green-500/10 text-green-600"
            : "bg-yellow-500/10 text-yellow-600"
        }
      >
        {order.status}
      </Badge>
    </span>
  </div>
))}

        </div>

        {/* ACTION */}
        <div className="flex justify-end">
          <Button variant="outline">Download Invoice</Button>
        </div>

      </div>
    </StudentLayout>
  );
};

export default OrderHistoryPage;