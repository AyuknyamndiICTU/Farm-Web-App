'use client';

import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function OrderManager({ orders, locale }: { orders: any[], locale: string }) {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  const updateStatus = async (orderId: string, newStatus: string) => {
    setLoading(orderId);
    try {
      const token = Cookies.get('token');
      await axios.patch(`${apiBase}/api/orders/${orderId}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      router.refresh();
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setLoading(null);
    }
  };

  if (orders.length === 0) {
    return <div className="text-center py-12 text-gray-500 bg-white rounded-xl border">No orders found.</div>;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-white p-6 border rounded-xl shadow-sm flex flex-col md:flex-row justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono bg-gray-100 p-1 rounded">#{order.id.slice(-6)}</span>
              <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 
                order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {order.status}
              </span>
            </div>
            <h3 className="font-bold">{order.items[0]?.product?.titleEn || 'Products'} x {order.items[0]?.quantity}</h3>
            <p className="text-sm text-gray-500">Buyer: {order.buyer?.name} ({order.buyer?.phone})</p>
            <p className="text-sm text-gray-500">Address: {order.deliveryAddress || 'Not provided'}</p>
          </div>

          <div className="flex flex-col items-end justify-between">
            <span className="text-xl font-bold text-green-700">{order.totalAmount} XAF</span>
            
            <div className="flex gap-2 mt-4">
               <select 
                 className="p-2 border rounded-md text-sm bg-gray-50"
                 value={order.status}
                 disabled={loading === order.id}
                 onChange={(e) => updateStatus(order.id, e.target.value)}
               >
                 <option value="PENDING">Pending</option>
                 <option value="CONFIRMED">Confirmed</option>
                 <option value="IN_TRANSIT">In Transit</option>
                 <option value="DELIVERED">Delivered</option>
                 <option value="CANCELLED">Cancelled</option>
               </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
