import type {Ticket} from "./types.ts";
import type { TicketStatus } from "./types.ts";

type TicketListProps = {ticket: Ticket[]}

function getTicketLabel(status: TicketStatus) {
    switch(status) {
        case "new": {
            return "Новая заявка 🔴"
        }
        case "in_progress": {
            return "Задача уже выполняется🟡"
        }
        case "closed": {
            return "Заявка закрыта🟢"
        }
    }
}

function TicketList({ticket}: TicketListProps) {
    return (
        <>
            {ticket.length < 1 && <p>Заявок пока нет</p>}
            {ticket.length > 0 && (
                <ul className="ticket-list">
                    {ticket.map(ticket => (
                        <li className="ticket-item" key={ticket.id}>
                            <p>{ticket.id}</p>
                            <p>{ticket.title}</p>
                            <p>{getTicketLabel(ticket.status)}</p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default TicketList