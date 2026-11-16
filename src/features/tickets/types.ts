export type TicketStatus = "new" | "in_progress" | "closed"

export type Ticket = {
    id: number,
    title: string,
    status: TicketStatus,
}