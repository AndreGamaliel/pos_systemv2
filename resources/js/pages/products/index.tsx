import { Category, Product } from '@/types';
import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    products: Product[];
    categories: Category[];
}

export default function ProductIndex({ products, categories }: Props) {
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Product | null>(null);

    function handleEdit(product: Product) {
        setEditing(product);
        setShowForm(true);
    }

    function handleDelete(product: Product) {
        if (!confirm(`delete "${product.name}"?`)) return;
        router.delete(`/products/${product.id}`, {
            onSuccess: () => {
                toast.success('Product deleted successfully');
            },
        });
    }

    function handleClose() {
        setShowForm(false);
        setEditing(null);
    }

    return (
        <>
            <Head title="Products" />
            <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Products</h1>
                    <Button
                        className="btn-primary flex items-center"
                        onClick={() => {
                            setEditing(null);
                            setShowForm(true);
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Product
                    </Button>
                </div>
            </div>
        </>
    );
}
