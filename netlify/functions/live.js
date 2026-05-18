export async function handler() {

  try {

    const res = await fetch(
      "https://www.thesportsdb.com/api/v1/json/3/livescore.php?s=Soccer"
    );

    const text = await res.text();

    console.log(text);

    const data = JSON.parse(text);

    if (!data.events || data.events.length === 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "No live matches right now"
        })
      };
    }

    const match = data.events[0];

    const output = {
      home: match.strHomeTeam,
      away: match.strAwayTeam,
      score: `${match.intHomeScore || 0}-${match.intAwayScore || 0}`,
      time: match.strProgress || "LIVE"
    };

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(output)
    };

  } catch (err) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message
      })
    };
  }
}