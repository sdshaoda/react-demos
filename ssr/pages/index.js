import React from 'react'

export async function getServerSideProps() {
  console.log('start fetch, url:https://api.thecatapi.com/v1/images/search')
  const res = await fetch('https://api.thecatapi.com/v1/images/search')
  const cat = await res.json()
  return { props: { cat } }
}

export default function Page({ cat }) {
  return <img src={cat[0].url} width='200' />
}
