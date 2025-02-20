import { ShoppingCartIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface PackageSideBoxProps {
  name: string;
  final_price: number;
  discount: number;
}

const PackageSideBox = ({
  name,
  final_price,
  discount
}: PackageSideBoxProps) => {
  const originalPrice = final_price + discount;

  return (
    <div className="hidden md:block">
      <div className="w-[380px]">
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl font-bold text-sky-600">${final_price.toFixed(2)}</span>
              {discount > 0 && (
                <span className="text-xl text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
              )}
            </div>
            {discount > 0 && (
              <div className="mt-2">
                <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                  Save ${discount.toFixed(2)} ({((discount / originalPrice) * 100).toFixed(0)}% OFF)
                </span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <button className="w-full font-semibold bg-gradient-to-r from-sky-400 to-sky-500 text-white py-3 px-4 rounded-lg hover:from-sky-500 hover:to-sky-600 transition-colors flex items-center justify-center gap-2">
              <CurrencyDollarIcon className="w-5 h-5" />
              Buy Now
            </button>
            <button className="w-full font-semibold bg-gray-100 text-gray-600 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              <ShoppingCartIcon className="w-5 h-5" />
              Add to Cart
            </button>
          </div>

       
        </div>
      </div>
    </div>
  );
};

export default PackageSideBox;
