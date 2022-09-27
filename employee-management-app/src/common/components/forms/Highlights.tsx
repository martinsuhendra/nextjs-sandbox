/* eslint-disable react/no-array-index-key */
import React from 'react'

import {
  Autocomplete,
  Grid,
  ListItemText,
  ListSubheader,
  TextField,
} from '@mui/material'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'

import { TOP_100_FILMS } from '@/common/constants/films'

type MovieType = {
  title: string
  year: number
  group: string
}

const Highlights = () => {
  const GENRE = ['Item', 'Category', 'SKU']
  const movies: MovieType[] = TOP_100_FILMS.map((movie) => ({
    ...movie,
    group: GENRE[Math.floor(Math.random() * GENRE.length)],
  }))
  return (
    <Autocomplete
      fullWidth
      options={movies.sort((a, b) => -b.group.localeCompare(a.group))}
      groupBy={(option) => option.group}
      getOptionLabel={(option) => option.title}
      renderGroup={(params) => (
        <Grid container display="inline-grid" xs={4} key={params.key}>
          <ListSubheader>{params.group}</ListSubheader>
          <ListItemText>{params.children}</ListItemText>
        </Grid>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Highlights" margin="normal" />
      )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.title, inputValue, { insideWords: true })
        const parts = parse(option.title, matches)

        return (
          <li {...props}>
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        )
      }}
    />
  )
}

export default Highlights
