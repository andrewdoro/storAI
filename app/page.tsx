import { nanoid } from 'ai'

export const maxDuration = 60

export default function Page() {
  const id = nanoid()
  return (
    <div></div>
    // <AI initialAIState={{ chatId: id, messages: [] }}>
    //   <Chat id={id} />
    // </AI>
  )
}
