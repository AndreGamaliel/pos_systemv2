import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Category } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type CategoryWithCount = Category & { products_count: number };

interface Props {
    categories: CategoryWithCount[];
}

export default function CategoryIndex({ categories }: Props) {
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Category | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        description: '',
    });

    function openCreate() {
        reset();
        setEditing(null);
        setShowForm(true);
    }

    function openDelete(cat: CategoryWithCount) {
        if (cat.products_count > 0) {
            toast.error(
                `Cannot Delete "${cat.name}" - it has ${cat.products_count} Product(s). Reassign them first.`,
            );
            return;
        }

        if (!confirm(`delete "${cat.name}"?`)) return;
        router.delete(`/categories/${cat.id}`, {
            onSuccess: () => {
                toast.success('Product deleted successfully');
            },
        });
    }

    function openEdit(cat: Category) {
        setData({ name: cat.name, description: cat.description ?? '' });
        setEditing(cat);
        setShowForm(true);
    }

    function closeForm() {
        reset();
        setShowForm(false);
        setEditing(null);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();
        if (editing) {
            put(`/categories/${editing.id}`, {
                onSuccess: () => {
                    toast.success('Category updated');
                    closeForm();
                },
            });
        } else {
            post('/categories', {
                onSuccess: () => {
                    (toast.success('Category created'), closeForm());
                },
            });
        }
    }

    return (
        <>
            <Head title="Categories" />
            <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Categories</h1>
                    <Button
                        className="btn-primary flex items-center"
                        onClick={() => {
                            openCreate;
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Category
                    </Button>
                </div>
                <div className="rounded-lg border">
                    <table className="w-full text-sm">
                        <thead className="border bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-center">Name</th>
                                <th className="px-4 py-3 text-center">
                                    Description
                                </th>
                                <th className="px-4 py-3 text-center">
                                    Products
                                </th>
                                <th className="px-4 py-3 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-4 py-8 text-center text-muted-foreground"
                                    >
                                        No Cetegories found. "Add Category" to
                                        get started.
                                    </td>
                                </tr>
                            )}
                            {categories.map((cat) => (
                                <tr
                                    key={cat.id}
                                    className="border-b last:border-0 hover:bg-muted/25"
                                >
                                    <td className="text-medium px-4 py-3 text-center">
                                        {cat.name}
                                    </td>
                                    <td className="px-4 py-3 text-center text-muted-foreground">
                                        {cat.description ? (
                                            cat.description
                                        ) : (
                                            <span className="text-xs text-muted-foreground/70 italic">
                                                (no description)
                                            </span>
                                        )}
                                    </td>
                                    <td className="text-medium px-4 py-3 text-center">
                                        {cat.products_count}
                                    </td>
                                    <td className="px-3 py-4 text-center">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => openEdit(cat)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => openDelete(cat)}
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Dialog */}
            <Dialog open={showForm} onOpenChange={closeForm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editing ? 'Edit Categgory' : 'Add Category'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <Label htmlFor="cat-name">Name</Label>
                            <Input
                                id="cat-name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div>
                            <Label htmlFor="cat-desc">
                                Description (Optional)
                            </Label>
                            <Input
                                id="cat-desc"
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                            />
                            <InputError message={errors.description} />
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={closeForm}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing
                                    ? 'Saving'
                                    : editing
                                      ? 'Update'
                                      : 'Create'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

CategoryIndex.layout = {
    breadcrumbs: [{ title: 'Categories', href: '/categories' }],
};
