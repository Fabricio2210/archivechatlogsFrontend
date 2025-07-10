'use client'

import React, { useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Loading } from '@/components/ui/Loading'

interface SearchFormProps {
  onResults: (data: any) => void
}

interface FormData {
  userName: string
  message: string
  dateFrom: string
  dateEnd: string
}

export function SearchForm({ onResults }: SearchFormProps) {
  const [form, setForm] = useState<FormData>({
    userName: '',
    message: '',
    dateFrom: '',
    dateEnd: ''
  })
  
  const [selectedChannel, setSelectedChannel] = useState('')
  const [usernameSearchType, setUsernameSearchType] = useState('match')
  const [messageSearchType, setMessageSearchType] = useState('matchPhrase')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const channels = [
    { value: '', label: 'Please select a channel:' },
    { value: 'DSP', label: 'DSPGaming' },
    { value: 'reacts', label: 'Dsp Reacts' },
    { value: 'THROWBACK', label: 'Dsp Throwback' },
    { value: 'DspGammingReal', label: 'DspGammingReal' },
    { value: 'RAW', label: 'Raw Phil' },
    { value: 'DDM', label: 'Dark Dave Mirror' },
    { value: 'POP', label: 'Piece of Piece' },
    { value: 'SHINKO', label: 'Shinko Fleur' },
    { value: 'AQUA', label: 'Aqua Teal' },
    { value: 'BEAM', label: 'Detractor Beam' },
    { value: 'DECEPTICRON', label: 'The Decepticron' },
    { value: 'DOODY', label: 'Doody Streams' },
    { value: 'PROPER', label: 'Agent Proper' },
    { value: 'MEERKAT', label: 'Meerkat Mob' },
    { value: 'TBS', label: 'That Being Said' },
    { value: 'WPIG', label: 'WPIG1651' },
    { value: 'TOXICITY', label: 'Toxicity Unmasked' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedChannel) {
      setError('Please select a channel first')
      return
    }

    setIsLoading(true)
    setError('')

    // Date validation logic from original
    let { dateFrom, dateEnd } = form
    const checkDate = moment(dateFrom, 'YYYY-MM-DD').diff(moment(dateEnd, 'YYYY-MM-DD'), 'days')
    const checkDateTodayFrom = moment(dateFrom, 'YYYY-MM-DD').diff(moment().format('YYYY-MM-DD'), 'days')
    const checkDateTodayEnd = moment(dateEnd, 'YYYY-MM-DD').diff(moment().format('YYYY-MM-DD'), 'days')

    if (checkDate >= 0) {
      dateEnd = dateFrom
    }
    if (checkDateTodayFrom >= 0) {
      dateFrom = moment().format('YYYY-MM-DD')
    }
    if (checkDateTodayEnd >= 0) {
      dateEnd = moment().format('YYYY-MM-DD')
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${selectedChannel}`,
        {
          userName: form.userName,
          message: form.message,
          hour: '',
          dateFrom,
          dateEnd
        },
        {
          params: {
            page: 0,
            limit: 51,
            userName: usernameSearchType,
            message: messageSearchType
          }
        }
      )

      onResults({
        data: response.data.data,
        totalPages: response.data.totalPages,
        totalResults: response.data.totalResults,
        searchParams: {
          ...form,
          dateFrom,
          dateEnd,
          selectedChannel,
          usernameSearchType,
          messageSearchType
        }
      })
    } catch (err: any) {
      setError(err.response?.data?.msg || 'An error occurred')
      setTimeout(() => setError(''), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <form onSubmit={handleSubmit} className={`border-form p-8 rounded-lg ${error ? 'animate-shake' : ''}`}>
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div className="space-y-6">
          <div className="form-section">
            <Input
              type="text"
              placeholder="Username"
              value={form.userName}
              onChange={(e) => setForm({ ...form, userName: e.target.value })}
              className="w-full mb-4"
            />
            
            <div className="radio-group">
              <label className="block text-sm label-text">Select the type of username search</label>
              <div className="space-y-3 ml-2">
                <label className="flex items-center radio-option">
                  <input
                    type="radio"
                    value="match"
                    checked={usernameSearchType === 'match'}
                    onChange={(e) => setUsernameSearchType(e.target.value)}
                    className="mr-3"
                  />
                  <span>Match</span>
                </label>
                <label className="flex items-center radio-option">
                  <input
                    type="radio"
                    value="prefix"
                    checked={usernameSearchType === 'prefix'}
                    onChange={(e) => setUsernameSearchType(e.target.value)}
                    className="mr-3"
                  />
                  <span>Prefix</span>
                </label>
                <label className="flex items-center radio-option">
                  <input
                    type="radio"
                    value="fuzz"
                    checked={usernameSearchType === 'fuzz'}
                    onChange={(e) => setUsernameSearchType(e.target.value)}
                    className="mr-3"
                  />
                  <span>Similar Matches</span>
                </label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <Input
              type="text"
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full mb-4"
            />
            
            <div className="radio-group">
              <label className="block text-sm label-text">Select the type of message search</label>
              <div className="space-y-3 ml-2">
                <label className="flex items-center radio-option">
                  <input
                    type="radio"
                    value="matchPhrase"
                    checked={messageSearchType === 'matchPhrase'}
                    onChange={(e) => setMessageSearchType(e.target.value)}
                    className="mr-3"
                  />
                  <span>Match phrase</span>
                </label>
                <label className="flex items-center radio-option">
                  <input
                    type="radio"
                    value="matchPhrasePrefix"
                    checked={messageSearchType === 'matchPhrasePrefix'}
                    onChange={(e) => setMessageSearchType(e.target.value)}
                    className="mr-3"
                  />
                  <span>Match Phrase Prefix</span>
                </label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <Select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="w-full"
            >
              {channels.map((channel) => (
                <option key={channel.value} value={channel.value}>
                  {channel.label}
                </option>
              ))}
            </Select>
          </div>

          <div className="form-section">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <Input
                  type="date"
                  value={form.dateFrom}
                  onChange={(e) => setForm({ ...form, dateFrom: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <Input
                  type="date"
                  value={form.dateEnd}
                  onChange={(e) => setForm({ ...form, dateEnd: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={!selectedChannel}
          className="w-full mt-6"
          size="lg"
        >
          {selectedChannel ? 'Search' : 'Choose a channel first'}
        </Button>
      </form>
    </div>
  )
}