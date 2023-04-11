import { PlayerModel } from "./Player"

test("can be created", () => {
  const instance = PlayerModel.create({})

  expect(instance).toBeTruthy()
})
