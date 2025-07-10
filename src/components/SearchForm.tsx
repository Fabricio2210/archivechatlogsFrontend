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
      <div className={`border-form ${error ? 'animate-shake' : ''}`}>
        <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
          <div className="form-section">
            <label htmlFor="username" className="block text-sm font-medium mb-2">Username</label>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              value={form.userName}
              onChange={(e) => setForm({ ...form, userName: e.target.value })}
              className="input-field"
            />
            
            <div className="radio-group">
              <p className="text-sm font-medium mb-3">Select the type of username search</p>
              <div className="space-y-2">
                <label className="flex items-center radio-option">
                  <input
                    type="radio"
                    value="match"
                    checked={usernameSearchType === 'match'}
                    onChange={(e) => setUsernameSearchType(e.target.value)}
                  />
                  <span>Match</span>
                </label>
                <label className="flex items-center radio-option">
                  <input
                    type="radio"
                    value="prefix"
                    checked={usernameSearchType === 'prefix'}
                    onChange={(e) => setUsernameSearchType(e.target.value)}
                  />
                  <span>Prefix</span>
                </label>
                <label className="flex items-center radio-option">
                  <input
                    type="radio"
                    value="fuzz"
                    checked={usernameSearchType === 'fuzz'}
                    onChange={(e) => setUsernameSearchType(e.target.value)}
                  />
                  <span>Similar Matches</span>
                </label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
            <Input
              id="message"
              type="text"
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="input-field"
            />
            
            <div className="radio-group">
              <p className="text-sm font-medium mb-3">Select the type of message search</p>
              <div className="space-y-2">
                <label className="flex items-center radio-option">
                  <input
                    type="radio"
                    value="matchPhrase"
                    checked={messageSearchType === 'matchPhrase'}
                    onChange={(e) => setMessageSearchType(e.target.value)}
                  />
                  <span>Match phrase</span>
                </label>
                <label className="flex items-center radio-option">
                  <input
                    type="radio"
                    value="matchPhrasePrefix"
                    checked={messageSearchType === 'matchPhrasePrefix'}
                    onChange={(e) => setMessageSearchType(e.target.value)}
                  />
                  <span>Match Phrase Prefix</span>
                </label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <label htmlFor="channel" className="block text-sm font-medium mb-2">Channel</label>
            <Select
              id="channel"
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="input-field"
            >
              {channels.map((channel) => (
                <option key={channel.value} value={channel.value}>
                  {channel.label}
                </option>
              ))}
            </Select>
          </div>

          <div className="form-section">
            <div className="date-grid">
              <div>
                <label htmlFor="dateFrom" className="block text-sm font-medium mb-2">Start Date</label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={form.dateFrom}
                  onChange={(e) => setForm({ ...form, dateFrom: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="dateEnd" className="block text-sm font-medium mb-2">End Date</label>
                <Input
                  id="dateEnd"
                  type="date"
                  value={form.dateEnd}
                  onChange={(e) => setForm({ ...form, dateEnd: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            disabled={!selectedChannel}
            className="btn-primary w-full"
            size="lg"
          >
            {selectedChannel ? 'Search' : 'Choose a channel first'}
          </Button>
        </form>
      </div>
    </div>
  )
}


        <Button
          type="submit"
          disabled={!selectedChannel}
          className="btn-primary w-full"
          size="lg"
        >
          {selectedChannel ? 'Search' : 'Choose a channel first'}
        </Button>
        </form>
      </div>
    </div>
  )
}