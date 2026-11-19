import './App.css';
import TicketList from "./features/tickets/TicketList.tsx";
import {tickets} from "./features/tickets/fixtures.ts";
import type { TicketStatus} from "./features/tickets/types.ts";
import { useState} from "react";

type TicketFilter = TicketStatus | "all"

function readTicketFilter(): TicketFilter {
    const status = new URLSearchParams(window.location.search).get("status");

    if (status === "new" || status === "closed" || status === "in_progress") {
        return status
    }
    else {
        return "all"
    }
}

function App() {
  const [filter, setFilter] = useState<TicketFilter>(readTicketFilter);
  const [query, setQuery] = useState('');

  const queryString = query.trim().toLowerCase();

  const visibleTickets = tickets.filter(ticket =>
      (filter === 'all' || ticket.status === filter) &&
      ticket.title.toLowerCase().includes(queryString)
  )
  return (
      <main>
        <header>
          <h1>Support Desk</h1>
          <p>Система управления заявками команды поддержки</p>
        </header>
        <section>
          <h2>Заявки</h2>
            <label htmlFor="ticket-search">Поиск по теме</label>
            <input id="ticket-search" value={query} onInput={event => setQuery(event.currentTarget.value)} type="text" placeholder="Поиск по теме"/>
            <span className="filter">
                <button className="filter-button" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>Все</button>
                <button className="filter-button" aria-pressed={filter === 'new'} onClick={() => setFilter('new')}>Новые</button>
                <button className="filter-button" aria-pressed={filter === 'in_progress'} onClick={() => setFilter('in_progress')}>В работе</button>
                <button className="filter-button" aria-pressed={filter === 'closed'} onClick={() => setFilter('closed')}>Закрытые</button>
            </span>
            {tickets.length > 0 && visibleTickets.length === 0
                ? (<p>По заданным условиям заявок не найдено</p>)
                : <TicketList ticket={visibleTickets} />
            }
            <p>Показано {visibleTickets.length} из {tickets.length}</p>
        </section>
      </main>
  )
}

export default App