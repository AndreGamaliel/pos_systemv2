import { Category, Product } from '@/types';

interface Props {
    product: Product | null;
    categories: Category[];
    onClose: () => void;
}
export default function CetegoryForm({ categories, onClose }: Props) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: categories?.name ?? '',
        description: categories?.description ?? '',
    });
}
