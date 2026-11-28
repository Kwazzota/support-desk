import {parseTickets} from "./api.ts";
import {test, expect, vi, afterEach} from "vitest";
import fetchTickets from "./api.ts";

afterEach(() => vi.unstubAllGlobals())

test("возращаает пустой массив", () => {
    const res = parseTickets([])
    expect(res).toEqual([])
})

test("возращает массив с корректной заявкой", () => {
    const ticket = {
        "id": 101,
        "title": "Не приходит письмо для входа",
        "status": "new"
    }
    const res = parseTickets([ticket])
    expect(res).toEqual([ticket])
})

test("выбрасывает ошибку если передать объект вместо массива", () => {
    const ticket = {
        "id": 101,
        "title": "Не приходит письмо для входа",
        "status": "new"
    }
    expect(() => parseTickets(ticket)).toThrow()
})

test("выбрасвает ошибку, если у второй заявки title число", () => {
    const tickets = [
        {
            "id": 101,
            "title": "Не приходит письмо для входа",
            "status": "new"
        },
        {
            "id": 102,
            "title": 42,
            "status": "in_progress"
        }
    ]
    expect(() => parseTickets(tickets)).toThrow()
})

test("загружает корректный список заявок", async () => {
    const tickets = [
        {
            "id": 101,
            "title": "Не приходит письмо для входа",
            "status": "new"
        }
    ]

    const response = Response.json(tickets)
    vi.stubGlobal("fetch", async () => response)
    const res = await fetchTickets()
    expect(res).toEqual(tickets)
})

test("Выбрасывает ошибку при HTTP 503", async () => {
    const tickets = [
        {
            "id": 101,
            "title": "Не приходит письмо для входа",
            "status": "new"
        }
    ]

    const response = Response.json(tickets, {status: 503})
    vi.stubGlobal("fetch", async () => response)
    await expect(fetchTickets()).rejects.toThrow()
})

test("отклоняет ответ со статусом 200, если у второй заявки title — число", async () => {
    const tickets = [
        {
            "id": 101,
            "title": "Не приходит письмо для входа",
            "status": "new"
        },
        {
            "id": 102,
            "title": 42,
            "status": "in_progress"
        }
    ]

    const response = Response.json(tickets)
    vi.stubGlobal("fetch", async () => response)
    await expect(fetchTickets()).rejects.toThrow()
})