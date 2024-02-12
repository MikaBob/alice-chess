import { basePath } from '../next.config'

interface imgLoaderProps {
    src: string
}

export default function imgLoader({ src }: imgLoaderProps) {
    return `${basePath}${src}`
}
