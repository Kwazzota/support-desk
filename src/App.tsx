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

function readQ() {
    const q = new URLSearchParams(window.location.search).get("q")

    if (!q) {
        return ""
    }

    else {
        return q
    }
}

function App() {
  const [filter, setFilter] = useState<TicketFilter>(readTicketFilter);
  const [query, setQuery] = useState(readQ);

  const queryString = query.trim().toLowerCase();

  const visibleTickets = tickets.filter(ticket =>
      (filter === 'all' || ticket.status === filter) &&
      ticket.title.toLowerCase().includes(queryString)
  )

  function toggleFilter(status: TicketFilter) {
      setFilter(status);

      const url = new URL(window.location.href)

      if (status === "all") {
          url.searchParams.delete("status");
      }

      else {
          url.searchParams.set("status", status)
      }

      window.history.replaceState(window.history.state, '', url)
  }

  function toggleSearch(q: string) {
      setQuery(q)

      const qry = new URL(window.location.href)

      if (q === "") {
          qry.searchParams.delete("q")
      } else {
          qry.searchParams.set("q", q)
      }

      window.history.replaceState(window.history.state, '', qry)
  }
  return (
      <main>
        <header>
          <h1>Support Desk</h1>
          <p>Система управления заявками команды поддержки</p>
        </header>
        <section>
          <h2>Заявки</h2>
            <label htmlFor="ticket-search">Поиск по теме</label>
            <input
                id="ticket-search"
                value={query}
                onInput={
                    event => {
                        toggleSearch(event.currentTarget.value)
                    }
                }
                type="text" placeholder="Поиск по теме"/>
            <span className="filter">
                <button
                    className="filter-button"
                    aria-pressed={filter === 'all'}
                    onClick={() => toggleFilter('all')}
                >
                    Все
                </button>
                <button
                    className="filter-button"
                    aria-pressed={filter === 'new'}
                    onClick={() => {
                        toggleFilter('new')
                    }}
                >
                    Новые
                </button>
                <button
                    className="filter-button"
                    aria-pressed={filter === 'in_progress'}
                    onClick={() => {
                        toggleFilter('in_progress')
                    }}
                >
                    В работе
                </button>
                <button
                    className="filter-button"
                    aria-pressed={filter === 'closed'}
                    onClick={() => {
                        toggleFilter('closed')
                    }}
                >
                    Закрытые
                </button>
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