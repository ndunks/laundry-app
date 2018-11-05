export interface User {
    username: string
    password: string
    level: string
}
export type Users = User[]

export interface ConfigFileType {
    title: string
    logo: string
    background: string
    satuan: string[]
    users: Users,
    session: string | null
}