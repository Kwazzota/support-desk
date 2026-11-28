import {parseTickets} from "./api.ts";
import {test, expect} from "vitest";


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