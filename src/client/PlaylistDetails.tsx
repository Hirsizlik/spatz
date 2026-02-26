import React from 'react';
import type {PlaylistItem} from '../shared/spotifyData.d.ts';

type PlaylistDetailsProps = {
    items: PlaylistItem[]
}

function ItemElement(item: PlaylistItem) {
    return <div key={item.item.id}>{item.item.name}</div>;
}

export default function PlaylistDetails({items}: PlaylistDetailsProps) {
    return items.map(i => ItemElement(i));
};