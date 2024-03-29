
import { readdirSync, writeFileSync } from "fs";
import AudioList from "./components/AudioList";

export default function Home() {

  // const files = readdirSync('./public/audio')
  // writeFileSync('files_list.json', JSON.stringify(files.map(file => {return {name: file}})))

  return <AudioList />
}
