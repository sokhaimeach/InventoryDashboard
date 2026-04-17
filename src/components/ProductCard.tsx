import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";

interface Props {
  productName: string;
  productPrice: number;
  qty: number;
  imageUrl: string;
}

function ProductCard({ productName, productPrice, qty, imageUrl }: Props) {
  return (
    <Card className="w-75 hover:shadow-xl transition-all duration-300 rounded-2xl p-0">
        <CardHeader className="p-0">
            <img src={imageUrl} alt={productName}
            width={300} height={200}
            className="rounded-t-2xl object-cover w-full h-50" />

        </CardHeader>
      <CardContent className="space-y-2 p-4 flex flex-col justify-start">
        <Badge className="w-fit">New</Badge>

        <CardTitle className="text-lg w-fit">{productName}</CardTitle>
        <p className="text-xl font-bold text-primary w-fit">{productPrice}</p>
      </CardContent>
      <CardFooter className="flex justify-center pb-3">
        <Button>View More</Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
