import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

export default function Page() {
  const orders = [
    {
      id: 1,
      name: 'Crispy Chicken Burger',
      image: '/placeholder.svg',
      orderId: '#123456',
    },
    {
      id: 2,
      name: 'Iced Latte',
      image: '/placeholder.svg',
      orderId: '#654321',
    },
    {
      id: 3,
      name: 'Pepperoni Pizza',
      image: '/placeholder.svg',
      orderId: '#987654',
    },
  ];
  return (
    <div className="grid gap-4 md:gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Orders</CardTitle>
          <CardDescription>
            Your orders for today. Keep up the good work!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="flex flex-col justify-between gap-4 py-4 md:flex-row md:items-center">
                  <div className="flex items-center gap-4">
                    <Image
                      alt="Image"
                      className="rounded-md object-cover"
                      height="64"
                      src={order.image}
                      style={{
                        aspectRatio: '64/64',
                        objectFit: 'cover',
                      }}
                      width="64"
                    />
                    <div className="grid flex-1 gap-1">
                      <h3 className="font-semibold">{order.name}</h3>
                      <p className="text-sm text-gray-500">
                        Order ID: {order.orderId}
                      </p>
                    </div>
                  </div>

                  <Button size="sm">Track</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
