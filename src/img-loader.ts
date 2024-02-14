import { basePath } from '../next.config'

interface imgLoaderProps {
    src: string
}

// Will load for every <Image /> component
export default function imgLoader({ src }: imgLoaderProps) {
    return `${basePath}${src}`
}
