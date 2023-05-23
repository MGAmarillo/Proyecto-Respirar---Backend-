const stationHistory = {
  temperature: [
    {
      date: '2023-05-23T00:00:00+00:00',
      value: 12
    },
    {
      date: '2023-05-23T02:00:00+00:00',
      value: 11
    },
    {
      date: '2023-05-23T04:00:00+00:00',
      value: 9
    },
    {
      date: '2023-05-23T06:00:00+00:00',
      value: 10
    },
    {
      date: '2023-05-23T10:00:00+00:00',
      value: 13
    },
    {
      date: '2023-05-23T12:00:00+00:00',
      value: 16
    },
    {
      date: '2023-05-23T14:00:00+00:00',
      value: 18
    },
    {
      date: '2023-05-23T15:00:00+00:00',
      value: 17
    },
    {
      date: '2023-05-23T16:00:00+00:00',
      value: 15
    },
    {
      date: '2023-05-23T18:00:00+00:00',
      value: 12
    },
    {
      date: '2023-05-23T20:00:00+00:00',
      value: 12
    },
    {
      date: '2023-05-23T22:00:00+00:00',
      value: 11
    }
  ]
}

const getHistory = (stationId, time, parameter) => {
  return stationHistory
}

export { getHistory }
