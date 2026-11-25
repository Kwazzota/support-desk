import type {Ticket} from "./types.ts";

function isTicket(ticket: unknown):ticket is Ticket {
    if (typeof ticket !== "object" || ticket === null) {
        return false
    }

    if ("id" in ticket && "title" in ticket && "status" in ticket) {
          return typeof ticket.id === "number" &&
              typeof ticket.title === "string" &&
              (ticket.status === "new" ||
                  ticket.status === "closed" ||
                  ticket.status === "in_progress"
              )
    }

    else {
        return false
    }
}

async function fetchTickets(): Promise<Ticket[]> {
    const response = await fetch('/tickets.json')

    if (response.ok) {
        const Json: unknown = await response.json()
        if (Array.isArray(Json)) {
            if (!Json.every(isTicket)) {
                throw new Error("Not all values are tickets")
            }
            else {
                return Json
            }
        }
        else {
            throw new Error("Value is not Array")
        }
    } else {
        throw new Error(response.statusText)
    }
}

export default fetchTickets