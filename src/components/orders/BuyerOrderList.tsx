'use client';

import { useTranslations } from 'next-intl';
import { Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const statusIcons: any = {
  PENDING: { icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
  CONFIRMED: { icon: CheckCircle, color: 'text-blue-500', bg: 'bg-blue-50' },
  IN_TRANSIT: { icon: Truck, color: 'text-purple-500', bg: 'bg-purple-50' },
  DELIVERED: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
  CANCELLED: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
};

export default function BuyerOrderList({ orders, locale }: { orders: any[], locale: string }) {
  const t = useTranslations('Navigation');

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-dashed">
        <Package className="mx-auto text-gray-300 mb-4" size={48} />
        <p className="text-gray-500">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => {
        const status = statusIcons[order.status] || statusIcons.PENDING;
        const Icon = status.icon;

        return (
          <div key={order.id} className="bg-white border rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-gray-400">ORDER #{order.id.slice(-8).toUpperCase()}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${status.bg} ${status.color}`}>
                      <Icon size={12} />
                      {order.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold">
                    {order.items.map((i: any) => (locale === 'en' ? i.product.titleEn : i.product.titleFr)).join(', ')}
                  </h3>
                  <p className="text-sm text-gray-500">Seller: {order.seller.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-green-700">{order.totalAmount} XAF</p>
                  <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="relative flex justify-between items-center max-w-md mx-auto mt-8">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 -z-10" />
                {['PENDING', 'CONFIRMED', 'IN_TRANSIT', 'DELIVERED'].map((step, idx) => {
                  const isCompleted = ['PENDING', 'CONFIRMED', 'IN_TRANSIT', 'DELIVERED'].indexOf(order.status) >= idx;
                  const isCurrent = order.status === step;
                  
                  return (
                    <div key={step} className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        isCompleted ? 'bg-green-600 border-green-600' : 'bg-white border-gray-200'
                      } ${isCurrent ? 'ring-4 ring-green-100' : ''}`} />
                      <span className={`text-[10px] mt-2 font-bold ${isCompleted ? 'text-green-700' : 'text-gray-400'}`}>
                        {step.replace('_', ' ')}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-3 flex justify-between items-center border-t">
               <span className="text-sm text-gray-500">Payment: <span className="font-semibold text-gray-700">{order.paymentMethod?.replace('_', ' ')}</span></span>
               <button className="text-green-600 text-sm font-bold hover:underline">View Details</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
