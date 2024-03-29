'use client'

import algoliasearch from "algoliasearch";
import { Hits, InfiniteHits, InstantSearch, SearchBox } from "react-instantsearch";
import AudioCard from "../AudioCard";
import 'instantsearch.css/themes/satellite.css';
import './list.css'

interface AudioListProps {
    // files: string[]
}

export default function AudioList(props: AudioListProps) {
    const client = algoliasearch('GR1ZJVDLAO', '5ab70842b6168ad0eda2d72260339ed4')

  return (
    <div>
      <InstantSearch searchClient={client} indexName="audio">
        <SearchBox />
        <Hits hitComponent={AudioCard} />
      </InstantSearch>
    </div>
  );
}