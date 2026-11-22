import type {Ticket} from "./types.ts";

async function fetchTickets(): Promise<Ticket[]> {
    const response = await fetch('/tickets.json')

    if (response.ok) {
        return response.json()
    } else {
        throw new Error(response.statusText)
    }
}

export default fetchTickets