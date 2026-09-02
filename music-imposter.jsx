import { useState, useEffect, useRef } from "react";

const THEMES = [
  "Heavy Metal", "Smooth Jazz", "Classical Piano", "Country Ballad", "Gospel Choir",
  "Death Metal", "Bossa Nova", "Bluegrass", "K-Pop", "Afrobeats",
  "Reggaeton", "Drill Rap", "Lo-Fi Hip Hop", "Indie Folk", "Synthwave",
  "Dancehall", "Deep House", "Punk Rock", "Ambient Techno", "Flamenco",
  "Delta Blues", "Trap Music", "Barbershop Quartet", "Doo-Wop", "Neo Soul",
  "Grunge", "New Wave", "Chillwave", "Vaporwave", "Psychedelic Rock",
  "Soft Rock", "Hard Rock", "Emo", "Post-Punk", "Math Rock",
  "Midwest Emo", "Pop Punk", "Ska", "Reggae", "Cumbia",
  "Merengue", "Salsa", "Tejano", "Norteño", "Mariachi",
  "Celtic Folk", "Viking Metal", "J-Pop", "City Pop", "Bedroom Pop",
  "Dream Pop", "Shoegaze", "Noise Rock", "Post-Rock", "Art Rock",
  "Progressive Rock", "Funk", "Disco", "R&B", "Motown",
  "Soul", "Zydeco", "Cajun", "Appalachian Folk", "Sea Shanty",
  "Gregorian Chant", "Opera", "Musical Theatre", "Spoken Word", "Slam Poetry",
  "Stadium Concert", "Jazz Bar at Midnight", "Open Mic Night",
  "Festival Main Stage", "Dive Bar Karaoke", "Church Choir",
  "Subway Busker", "Rooftop DJ Set", "Tiny Desk Concert",
  "Drive-In Concert", "Symphony Hall", "Outdoor Amphitheatre",
  "Basement Show", "House Party DJ", "Beach Bonfire Singalong",
  "Elevator Music", "Dentist Office Radio", "Supermarket Muzak",
  "Club at 2AM", "Warm-Up Act", "Festival Side Stage",
  "Hotel Lobby Piano", "Cruise Ship Show Band", "State Fair",
  "High School Battle of the Bands", "Open Air Festival",
  "Drum Solo", "Bass Drop", "Guitar Hero Shredding", "Violin Virtuoso",
  "Trumpet Jazz Solo", "Piano Ballad", "Acoustic Guitar Serenade",
  "DJ Turntables", "Theremin Performance", "Ukulele Cover",
  "Banjo Breakdown", "Sax Solo", "Harp Solo", "Cello Suite",
  "Beatboxing", "A Cappella Group", "One-Man Band",
  "Air Guitar Champion", "Finger Drumming", "Lip Sync Battle",
  "Recording Studio Session", "Mixing the Final Master", "Beat Making at 3AM",
  "Sampling a Vinyl Record", "Auto-Tune Heavy", "Raw Acoustic Recording",
  "Vocal Booth Warm-Up", "Producer's Demo Tape", "Lo-Fi Tape Recording",
  "Sound Engineer's Nightmare", "Triple-Tracked Guitars", "Layered Harmonies",
  "Drum Machine Programming", "Field Recording", "Live Studio Take",
  "Pre-Game Hype Playlist", "Crying to a Breakup Song", "Gym Workout Banger",
  "Late Night Study Music", "Morning Commute Playlist", "Road Trip Sing-Along",
  "First Dance at a Wedding", "Funeral Hymn", "Lullaby for a Baby",
  "Rage Against the Speakers", "Slow Dance in the Kitchen",
  "Headphones In, World Out", "Guilty Pleasure Pop Song",
  "Song Stuck in Your Head", "Misheard Lyrics", "Wrong Playlist Moment",
  "Shuffle Mode Surprise", "Skip Every Song", "Repeat One All Day",
  "Song That Makes You Cry", "Song That Brings You Joy",
  "First Song at the Club", "Last Song of the Night",
  "Driving Too Fast to This", "Crying in the Car",
  "Grammy Acceptance Speech", "Album Release Day", "Chart-Topping Single",
  "One Hit Wonder", "Comeback Album", "Debut EP Drop",
  "Going Platinum", "B-Side Deep Cut", "Hidden Track",
  "Leaked Album", "Music Video Shoot", "Press Tour Interview",
  "World Tour Bus Life", "Backstage Rider Demands", "Meet & Greet Line",
  "Record Label Drama", "Signing a Record Deal",
  "Going Independent", "Sold-Out Tour", "Cancelled Tour",
  "Surprise Drop", "Concept Album", "Double Album",
  "Live Album Recording", "Unplugged Special", "Covers Album",
  "60s Beatlemania", "70s Disco Fever", "80s Power Ballad",
  "90s Boy Band", "00s Pop Princess", "10s EDM Festival",
  "20s Bedroom Producer", "Woodstock 1969", "Punk Revolution 1977",
  "Grunge Era Seattle", "Rave Scene 1992", "Napster Era",
  "MTV Total Request Live", "Radio Countdown Show",
  "Cassette Tape Rewind", "CD Booklet Reading", "Vinyl Record Flip Side",
  "Streaming Era", "Algorithm Playlist",
  "Power Ballad Key Change", "Four-Chord Pop Song", "Verse-Chorus-Bridge",
  "The Guitar Solo That Goes On Too Long", "When the Drop Hits",
  "Unexpected Time Signature", "Song in a Minor Key",
  "Modulating to a Higher Key", "The Bridge Nobody Sings Along To",
  "Extended Outro", "Thirty-Second Intro", "Slow Intro Fast Song",
  "Quiet Verse Loud Chorus", "The Breakdown Section",
  "Finger Snap Beat", "Hand Clap Rhythm", "Whistling Hook",
  "Call and Response", "Spoken Word Interlude",
  "Orchestra Swell", "Fade Out Ending", "Cold Stop Ending",
  "Reprise at the End", "Overture", "Medley",
  "Knowing Every Lyric", "Singing the Wrong Words Confidently",
  "Air Drumming in Public", "Concert Merch Queue",
  "Defending Your Favourite Artist", "Gatekeeping a Band",
  "Introducing a Friend to a New Genre", "Obsessing Over an Album",
  "Overplaying a Song Until You Hate It", "Rediscovering an Old Favourite",
  "Live Show Disappointment", "Life-Changing Concert",
  "Crowd Surfing", "Mosh Pit Survivor", "Lighter in the Air",
  "Phone Flashlight at a Ballad", "Waiting for the Encore",
  "Leaving Before the Last Song", "Front Row Standing",
  "Watching from the Back",
];

// Loose hints for the imposter — related to music broadly but NOT to the specific theme.
// Keyed by theme. Fallback hints used when no specific hint exists.
const HINTS = {
  // Genres
  "Heavy Metal": "Something about loud, amplified sound",
  "Smooth Jazz": "Something slow and late at night",
  "Classical Piano": "Something with keys and no words",
  "Country Ballad": "Something about heartache and an acoustic instrument",
  "Gospel Choir": "Something with many voices singing together",
  "Death Metal": "Something extremely intense with distorted sound",
  "Bossa Nova": "Something warm, breezy and rhythmic",
  "Bluegrass": "Something acoustic and hand-played",
  "K-Pop": "Something polished with synchronized choreography",
  "Afrobeats": "Something rhythmic, danceable and joyful",
  "Reggaeton": "Something with a heavy, repetitive beat",
  "Drill Rap": "Something from a city, dark and minimal",
  "Lo-Fi Hip Hop": "Something calm and slightly imperfect-sounding",
  "Indie Folk": "Something quiet, personal and acoustic",
  "Synthwave": "Something that sounds like the 80s but made recently",
  "Dancehall": "Something meant to move your body",
  "Deep House": "Something underground and hypnotic",
  "Punk Rock": "Something fast, angry and three chords",
  "Ambient Techno": "Something electronic but almost not there",
  "Flamenco": "Something with stomping and passionate strings",
  "Delta Blues": "Something raw, old and soulful",
  "Trap Music": "Something with heavy bass and hi-hats",
  "Barbershop Quartet": "Something with four-part vocal harmony",
  "Doo-Wop": "Something old, sweet and group-sung",
  "Neo Soul": "Something smooth and emotionally rich",
  "Grunge": "Something dirty, guitar-heavy and from the 90s",
  "New Wave": "Something synth-y and slightly quirky",
  "Chillwave": "Something hazy and nostalgic",
  "Vaporwave": "Something ironic and aesthetically retro",
  "Psychedelic Rock": "Something trippy with lots of reverb",
  "Soft Rock": "Something easy to listen to in the background",
  "Hard Rock": "Something with big guitars and attitude",
  "Emo": "Something emotional and guitar-driven",
  "Post-Punk": "Something angular and a bit dark",
  "Math Rock": "Something with unusual rhythms and no singing",
  "Midwest Emo": "Something sad, guitar-heavy and earnest",
  "Pop Punk": "Something fast, catchy and rebellious",
  "Ska": "Something upbeat with a brass section",
  "Reggae": "Something laid-back with an offbeat rhythm",
  "Cumbia": "Something danceable from Latin America",
  "Merengue": "Something fast and rhythmic from the Caribbean",
  "Salsa": "Something spicy and brass-heavy",
  "Mariachi": "Something festive with trumpets and guitars",
  "Celtic Folk": "Something with fiddles and ancient feeling",
  "Viking Metal": "Something epic, cold and mythological",
  "J-Pop": "Something bright, catchy and from Japan",
  "City Pop": "Something smooth and urban from the 80s",
  "Bedroom Pop": "Something intimate and home-recorded",
  "Dream Pop": "Something hazy and beautiful",
  "Shoegaze": "Something washed in reverb and distortion",
  "Noise Rock": "Something abrasive and not for everyone",
  "Post-Rock": "Something instrumental that builds slowly",
  "Art Rock": "Something ambitious and deliberately artistic",
  "Progressive Rock": "Something complex, long and album-oriented",
  "Funk": "Something groovy and bass-led",
  "Disco": "Something made for a dance floor in the 70s",
  "R&B": "Something smooth and vocally expressive",
  "Motown": "Something classic, soulful and from Detroit",
  "Soul": "Something deep, emotional and heartfelt",
  "Sea Shanty": "Something sung by groups doing physical work",
  "Gregorian Chant": "Something ancient and sung in unison",
  "Opera": "Something theatrical with trained classical voices",
  "Musical Theatre": "Something dramatic, sung and on a stage",
  "Spoken Word": "Something between speech and poetry",
  "Slam Poetry": "Something performed loudly and emotionally",
  // Venues
  "Stadium Concert": "Something enormous and far from the stage",
  "Jazz Bar at Midnight": "Something intimate, dark and smoky",
  "Open Mic Night": "Something brave and unpredictable",
  "Festival Main Stage": "Something seen by thousands at once",
  "Dive Bar Karaoke": "Something off-key but enthusiastic",
  "Church Choir": "Something reverent and communal",
  "Subway Busker": "Something heard while rushing past",
  "Rooftop DJ Set": "Something outdoors at sunset",
  "Tiny Desk Concert": "Something stripped-back and intimate",
  "Drive-In Concert": "Something experienced from a car",
  "Symphony Hall": "Something formal with an expensive seat",
  "Outdoor Amphitheatre": "Something under the open sky",
  "Basement Show": "Something sweaty and underground",
  "House Party DJ": "Something loud in a small space",
  "Beach Bonfire Singalong": "Something casual and group-sung",
  "Elevator Music": "Something forgettable and inoffensive",
  "Dentist Office Radio": "Something you didn't choose to hear",
  "Supermarket Muzak": "Something playing while you shop",
  "Club at 2AM": "Something playing when inhibitions are gone",
  "Warm-Up Act": "Something before the real show",
  "Festival Side Stage": "Something discovered by accident",
  "Hotel Lobby Piano": "Something sophisticated and ambient",
  "Cruise Ship Show Band": "Something cheesy but surprisingly fun",
  "State Fair": "Something live and a little chaotic",
  "High School Battle of the Bands": "Something competitive and nervous",
  "Open Air Festival": "Something with mud and sunscreen",
  // Instruments
  "Drum Solo": "Something rhythmic with no other instruments",
  "Bass Drop": "Something where the low end takes over",
  "Guitar Hero Shredding": "Something fast and technically impressive",
  "Violin Virtuoso": "Something classical and deeply skilled",
  "Trumpet Jazz Solo": "Something brassy and improvisational",
  "Piano Ballad": "Something just keys and a voice",
  "Acoustic Guitar Serenade": "Something intimate and unplugged",
  "DJ Turntables": "Something made by manipulating other sounds",
  "Theremin Performance": "Something eerie and hands-free",
  "Ukulele Cover": "Something sweet and small-scale",
  "Banjo Breakdown": "Something fast, plucked and country-adjacent",
  "Sax Solo": "Something smooth and slightly cinematic",
  "Harp Solo": "Something angelic and ethereal",
  "Cello Suite": "Something deep, bowed and melancholic",
  "Beatboxing": "Something vocal but rhythmic",
  "A Cappella Group": "Something with no instruments at all",
  "One-Man Band": "Something played by a single busy person",
  "Air Guitar Champion": "Something that exists only in the mind",
  "Finger Drumming": "Something rhythmic on a flat surface",
  "Lip Sync Battle": "Something performed without real singing",
  // Studio
  "Recording Studio Session": "Something created in a controlled environment",
  "Mixing the Final Master": "Something technical at the very end",
  "Beat Making at 3AM": "Something made alone, late and inspired",
  "Sampling a Vinyl Record": "Something built from old sounds",
  "Auto-Tune Heavy": "Something where the voice is processed heavily",
  "Raw Acoustic Recording": "Something captured without effects",
  "Vocal Booth Warm-Up": "Something preparatory and private",
  "Producer's Demo Tape": "Something rough and early-stage",
  "Lo-Fi Tape Recording": "Something imperfect on purpose",
  "Sound Engineer's Nightmare": "Something technically problematic",
  "Triple-Tracked Guitars": "Something layered and wall-of-sound",
  "Layered Harmonies": "Something where many voices stack up",
  "Drum Machine Programming": "Something rhythmic made by a computer",
  "Field Recording": "Something captured in the real world",
  "Live Studio Take": "Something performed all at once",
  // Moods
  "Pre-Game Hype Playlist": "Something that pumps you up before an event",
  "Crying to a Breakup Song": "Something emotionally devastating",
  "Gym Workout Banger": "Something high-energy and motivating",
  "Late Night Study Music": "Something that helps you focus",
  "Morning Commute Playlist": "Something that starts the day",
  "Road Trip Sing-Along": "Something with words everyone knows",
  "First Dance at a Wedding": "Something romantic and meaningful",
  "Funeral Hymn": "Something solemn and farewell-like",
  "Lullaby for a Baby": "Something gentle and sleep-inducing",
  "Rage Against the Speakers": "Something you turn up in anger",
  "Slow Dance in the Kitchen": "Something intimate and unplanned",
  "Headphones In, World Out": "Something personal and isolating",
  "Guilty Pleasure Pop Song": "Something you love but won't admit",
  "Song Stuck in Your Head": "Something annoyingly catchy",
  "Misheard Lyrics": "Something you've been singing wrong",
  "Wrong Playlist Moment": "Something jarring in the wrong context",
  "Shuffle Mode Surprise": "Something unexpected from your own library",
  "Skip Every Song": "Something that somehow doesn't fit your mood",
  "Repeat One All Day": "Something you can't stop listening to",
  "Song That Makes You Cry": "Something emotionally overwhelming",
  "Song That Brings You Joy": "Something that instantly lifts your mood",
  "First Song at the Club": "Something that sets the energy for the night",
  "Last Song of the Night": "Something bittersweet and closing",
  "Driving Too Fast to This": "Something that makes you press the accelerator",
  "Crying in the Car": "Something you only let yourself feel alone",
  // Industry
  "Grammy Acceptance Speech": "Something about being publicly recognized",
  "Album Release Day": "Something anticipated and finally available",
  "Chart-Topping Single": "Something everyone is hearing at once",
  "One Hit Wonder": "Something remembered for just one moment",
  "Comeback Album": "Something after a long silence",
  "Debut EP Drop": "Something first and tentative",
  "Going Platinum": "Something heard by millions",
  "B-Side Deep Cut": "Something most fans never found",
  "Hidden Track": "Something only discovered by the patient listener",
  "Leaked Album": "Something released before it was meant to be",
  "Music Video Shoot": "Something visual accompanying sound",
  "Press Tour Interview": "Something promotional and rehearsed",
  "World Tour Bus Life": "Something nomadic and exhausting",
  "Backstage Rider Demands": "Something a performer requires offstage",
  "Meet & Greet Line": "Something brief and meaningful for a fan",
  "Record Label Drama": "Something contractual and stressful",
  "Signing a Record Deal": "Something life-changing on paper",
  "Going Independent": "Something self-driven and risky",
  "Sold-Out Tour": "Something in demand",
  "Cancelled Tour": "Something disappointing and logistical",
  "Surprise Drop": "Something released without warning",
  "Concept Album": "Something with a unified artistic story",
  "Double Album": "Something ambitious and perhaps too long",
  "Live Album Recording": "Something captured in front of an audience",
  "Unplugged Special": "Something stripped of electricity",
  "Covers Album": "Something made entirely from other people's songs",
  // Decades
  "60s Beatlemania": "Something that caused hysteria in crowds",
  "70s Disco Fever": "Something made for dancing in sparkly outfits",
  "80s Power Ballad": "Something with big hair and big feelings",
  "90s Boy Band": "Something carefully coordinated and choreographed",
  "00s Pop Princess": "Something manufactured and hugely popular",
  "10s EDM Festival": "Something electronic and festival-sized",
  "20s Bedroom Producer": "Something made alone with a laptop",
  "Woodstock 1969": "Something historic and muddy",
  "Punk Revolution 1977": "Something angry and anti-establishment",
  "Grunge Era Seattle": "Something flannel-clad and disillusioned",
  "Rave Scene 1992": "Something all-night in a warehouse",
  "Napster Era": "Something obtained without paying for it",
  "MTV Total Request Live": "Something voted for by teenagers on TV",
  "Radio Countdown Show": "Something ranked and counted down weekly",
  "Cassette Tape Rewind": "Something you had to physically wind back",
  "CD Booklet Reading": "Something that came with liner notes",
  "Vinyl Record Flip Side": "Something requiring manual effort to continue",
  "Streaming Era": "Something accessed instantly without owning it",
  "Algorithm Playlist": "Something chosen by a machine learning your taste",
  // Structure
  "Power Ballad Key Change": "Something that unexpectedly shifts upward",
  "Four-Chord Pop Song": "Something built on a very simple pattern",
  "Verse-Chorus-Bridge": "Something following the most common song structure",
  "The Guitar Solo That Goes On Too Long": "Something impressive but overstaying its welcome",
  "When the Drop Hits": "Something building tension then releasing it suddenly",
  "Unexpected Time Signature": "Something rhythmically confusing",
  "Song in a Minor Key": "Something that sounds darker or sadder",
  "Modulating to a Higher Key": "Something that escalates in intensity",
  "The Bridge Nobody Sings Along To": "Something in a song people always forget",
  "Extended Outro": "Something that takes a long time to end",
  "Thirty-Second Intro": "Something that takes time before anything happens",
  "Slow Intro Fast Song": "Something deceptive about its true energy",
  "Quiet Verse Loud Chorus": "Something with dramatic dynamic contrast",
  "The Breakdown Section": "Something where the song strips back",
  "Finger Snap Beat": "Something rhythmic but very light",
  "Hand Clap Rhythm": "Something the audience can join in on",
  "Whistling Hook": "Something memorable with no words",
  "Call and Response": "Something where two parts answer each other",
  "Spoken Word Interlude": "Something where the singing stops briefly",
  "Orchestra Swell": "Something that builds with many instruments",
  "Fade Out Ending": "Something that gradually disappears",
  "Cold Stop Ending": "Something that cuts off abruptly",
  "Reprise at the End": "Something returning to an earlier melody",
  "Overture": "Something that previews what's to come",
  "Medley": "Something that strings many songs together",
  // Fan experiences
  "Knowing Every Lyric": "Something you've absorbed completely",
  "Singing the Wrong Words Confidently": "Something embarrassing in a crowd",
  "Air Drumming in Public": "Something involuntary and rhythmic",
  "Concert Merch Queue": "Something expensive and worth waiting for",
  "Defending Your Favourite Artist": "Something protective and possibly irrational",
  "Gatekeeping a Band": "Something about excluding newer fans",
  "Introducing a Friend to a New Genre": "Something that expands someone's taste",
  "Obsessing Over an Album": "Something listened to on repeat for weeks",
  "Overplaying a Song Until You Hate It": "Something ruined by too much love",
  "Rediscovering an Old Favourite": "Something felt like hearing it fresh again",
  "Live Show Disappointment": "Something that didn't live up to expectations",
  "Life-Changing Concert": "Something that altered how you hear music",
  "Crowd Surfing": "Something that requires trust in strangers",
  "Mosh Pit Survivor": "Something physically intense at a show",
  "Lighter in the Air": "Something slow and emotional at a concert",
  "Phone Flashlight at a Ballad": "Something replacing an older ritual",
  "Waiting for the Encore": "Something uncertain but hopeful",
  "Leaving Before the Last Song": "Something practical but regrettable",
  "Front Row Standing": "Something exhausting but unforgettable",
  "Watching from the Back": "Something at a comfortable distance",
};

// Fallback hints when theme not in map
const FALLBACK_HINTS = [
  "Something you might hear in a dark room",
  "Something connected to how sound moves people",
  "Something about the experience of listening",
  "Something related to what happens at a live performance",
  "Something about how music gets made or shared",
  "Something tied to a feeling music can create",
  "Something that involves rhythm or melody",
  "Something you'd associate with a particular time of day",
];

function getHint(theme) {
  return HINTS[theme] || FALLBACK_HINTS[Math.floor(Math.random() * FALLBACK_HINTS.length)];
}

const CARD_COLORS = [
  "#FFB3C6", "#FFCBA4", "#FFF3B0", "#B5EAD7",
  "#C7DEFF", "#E2CCFF", "#D4B3FF", "#FFADA0",
  "#A8DAFF", "#C3E6CB",
];

function pickTheme(exclude = []) {
  const available = THEMES.filter(t => !exclude.includes(t));
  const pool = available.length > 0 ? available : THEMES;
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function App() {
  const [screen, setScreen] = useState("setup");
  const [players, setPlayers] = useState([
    { name: "Player 1" },
    { name: "Player 2" },
    { name: "Player 3" },
  ]);
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [imposterIdx, setImposterIdx] = useState(null);
  const [theme, setTheme] = useState("");
  const [usedThemes, setUsedThemes] = useState([]);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [cardColor, setCardColor] = useState(CARD_COLORS[0]);
  const [handingOff, setHandingOff] = useState(false);
  const [backVisible, setBackVisible] = useState(false);
  // Whether the player has seen their card at least once (unlocks pass button)
  const [hasSeenCard, setHasSeenCard] = useState(false);
  const [firstPlayerIdx, setFirstPlayerIdx] = useState(0);
  const flipTimeoutRef = useRef(null);

  const addPlayer = () => {
    if (players.length < 10)
      setPlayers([...players, { name: `Player ${players.length + 1}` }]);
  };

  const removePlayer = (i) => {
    if (players.length > 2) {
      const p = [...players];
      p.splice(i, 1);
      setPlayers(p);
    }
  };

  const updateName = (i, val) => {
    const p = [...players];
    p[i].name = val;
    setPlayers(p);
  };

  const startGame = () => {
    const newTheme = pickTheme(usedThemes);
    const imp = Math.floor(Math.random() * players.length);
    const first = Math.floor(Math.random() * players.length);
    setTheme(newTheme);
    setImposterIdx(imp);
    setFirstPlayerIdx(first);
    setCurrentPlayerIdx(0);
    setCardFlipped(false);
    setBackVisible(false);
    setHasSeenCard(false);
    setCardColor(CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)]);
    setScreen("reveal");
  };

  const nextTheme = () => {
    const newUsed = [...usedThemes, theme];
    const newTheme = pickTheme(newUsed);
    const imp = Math.floor(Math.random() * players.length);
    const first = Math.floor(Math.random() * players.length);
    setUsedThemes(newUsed);
    setTheme(newTheme);
    setImposterIdx(imp);
    setFirstPlayerIdx(first);
    setCurrentPlayerIdx(0);
    setCardFlipped(false);
    setBackVisible(false);
    setHasSeenCard(false);
    setCardColor(CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)]);
    setScreen("reveal");
  };

  const handleCardTap = () => {
    if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
    if (!cardFlipped) {
      setCardFlipped(true);
      flipTimeoutRef.current = setTimeout(() => {
        setBackVisible(true);
        setHasSeenCard(true);
      }, 310);
    } else {
      setBackVisible(false);
      setCardFlipped(false);
    }
  };

  const handlePass = () => {
    const nextIdx = currentPlayerIdx + 1;
    if (nextIdx >= players.length) {
      setScreen("finale");
    } else {
      setHandingOff(true);
      setBackVisible(false);
      setCardFlipped(false);
      setHasSeenCard(false);
      setTimeout(() => {
        setCurrentPlayerIdx(nextIdx);
        setCardColor(CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)]);
        setHandingOff(false);
      }, 420);
    }
  };

  const isImposter = currentPlayerIdx === imposterIdx;
  const playerName = players[currentPlayerIdx]?.name || `Player ${currentPlayerIdx + 1}`;
  const hint = getHint(theme);

  return (
    <div style={styles.root}>
      <div style={styles.bg} />
      {screen === "setup" && (
        <SetupScreen
          players={players}
          onAdd={addPlayer}
          onRemove={removePlayer}
          onUpdate={updateName}
          onStart={startGame}
        />
      )}
      {screen === "reveal" && (
        <RevealScreen
          players={players}
          currentIdx={currentPlayerIdx}
          playerName={playerName}
          isImposter={isImposter}
          theme={theme}
          hint={hint}
          cardFlipped={cardFlipped}
          backVisible={backVisible}
          hasSeenCard={hasSeenCard}
          onCardTap={handleCardTap}
          cardColor={cardColor}
          onPass={handlePass}
          handingOff={handingOff}
          totalPlayers={players.length}
        />
      )}
      {screen === "finale" && (
        <FinaleScreen
          players={players}
          firstPlayerIdx={firstPlayerIdx}
          onNext={nextTheme}
          onSetup={() => setScreen("setup")}
        />
      )}
    </div>
  );
}

function SetupScreen({ players, onAdd, onRemove, onUpdate, onStart }) {
  return (
    <div style={styles.screen}>
      <div style={styles.setupContainer}>
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>🎵</div>
          <h1 style={styles.logo}>Imposter Tune</h1>
          <p style={styles.tagline}>Who doesn't know the vibe?</p>
        </div>
        <div style={styles.playersCard}>
          <h2 style={styles.sectionTitle}>Players</h2>
          <div style={styles.playerList}>
            {players.map((p, i) => (
              <div key={i} style={styles.playerRow}>
                <div style={{ ...styles.playerBadge, background: CARD_COLORS[i % CARD_COLORS.length] }}>
                  {i + 1}
                </div>
                <input
                  style={styles.playerInput}
                  value={p.name}
                  onChange={e => onUpdate(i, e.target.value)}
                  placeholder={`Player ${i + 1}`}
                  maxLength={20}
                />
                {players.length > 2 && (
                  <button style={styles.removeBtn} onClick={() => onRemove(i)}>×</button>
                )}
              </div>
            ))}
          </div>
          {players.length < 10 && (
            <button style={styles.addBtn} onClick={onAdd}>
              <span>+</span> Add Player
            </button>
          )}
        </div>
        <button style={styles.playBtn} onClick={onStart}>
          Play Game 🎶
        </button>
      </div>
    </div>
  );
}

function RevealScreen({ players, currentIdx, playerName, isImposter, theme, hint, cardFlipped, backVisible, hasSeenCard, onCardTap, cardColor, onPass, handingOff, totalPlayers }) {
  const progress = (currentIdx / totalPlayers) * 100;
  const nextPlayerName = currentIdx + 1 < totalPlayers
    ? (players[currentIdx + 1]?.name || `Player ${currentIdx + 2}`)
    : null;

  return (
    <div style={styles.screen}>
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0.8); opacity: 0; }
          70% { transform: scale(1.04); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <div style={styles.revealContainer}>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }} />
        </div>
        <div style={styles.revealHeader}>
          <span style={styles.stepLabel}>{currentIdx + 1} / {totalPlayers}</span>
          <h2 style={styles.revealName}>{playerName}</h2>
          <p style={styles.revealInstruction}>
            {!hasSeenCard
              ? "Tap the card to see your role"
              : cardFlipped
              ? "Tap card to hide it, then pass"
              : "Pass when ready"}
          </p>
        </div>

        <div style={{
          ...styles.cardWrapper,
          opacity: handingOff ? 0 : 1,
          transform: handingOff ? "scale(0.9)" : "scale(1)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}>
          <div style={styles.cardScene} onClick={onCardTap}>
            <div style={{
              ...styles.cardInner,
              transform: cardFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}>
              {/* Front */}
              <div style={styles.cardFront}>
                <div style={styles.cardFrontInner}>
                  <div style={styles.cardNote}>🎵</div>
                  <p style={styles.cardTapText}>Tap to reveal</p>
                  <p style={styles.cardSubText}>Only {playerName} should be looking</p>
                </div>
              </div>

              {/* Back — color and content only appear after 90° */}
              <div style={{
                ...styles.cardBack,
                background: backVisible
                  ? (isImposter
                    ? "linear-gradient(135deg, #ffe0e0 0%, #ffc2c2 100%)"
                    : `linear-gradient(135deg, ${cardColor}99 0%, ${cardColor} 100%)`)
                  : "linear-gradient(135deg, #F0E6FF 0%, #E2CCFF 100%)",
              }}>
                <div style={{ ...styles.cardBackInner, opacity: backVisible ? 1 : 0, transition: "opacity 0.15s ease" }}>
                  {isImposter ? (
                    <>
                      <div style={styles.cardEmoji}>🕵️</div>
                      <p style={styles.imposterLabel}>You are the</p>
                      <p style={styles.imposterWord}>IMPOSTER</p>
                      <div style={styles.hintBox}>
                        <p style={styles.hintBoxLabel}>Your hint</p>
                        <p style={styles.hintBoxText}>{hint}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={styles.cardEmoji}>🎧</div>
                      <p style={styles.themeLabel}>The vibe is</p>
                      <p style={styles.themeWord}>{theme}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pass button shown as soon as card has been seen, regardless of current flip state */}
        <div style={{ minHeight: 64, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", maxWidth: 320, gap: 8 }}>
          {hasSeenCard && !handingOff ? (
            <button
              style={{ ...styles.passBtn, animation: "popIn 0.3s ease" }}
              onClick={e => { e.stopPropagation(); onPass(); }}
            >
              {nextPlayerName ? `Pass to ${nextPlayerName} →` : "All done! →"}
            </button>
          ) : !hasSeenCard ? (
            <p style={styles.hintText}>↑ Tap the card to reveal</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function FinaleScreen({ players, firstPlayerIdx, onNext, onSetup }) {
  const [showNotes, setShowNotes] = useState(false);
  const [showFirst, setShowFirst] = useState(false);
  const firstPlayer = players[firstPlayerIdx]?.name || `Player ${firstPlayerIdx + 1}`;
  const firstColor = CARD_COLORS[firstPlayerIdx % CARD_COLORS.length];

  useEffect(() => {
    const t1 = setTimeout(() => setShowNotes(true), 200);
    const t2 = setTimeout(() => setShowFirst(true), 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const notes = ["🎵", "🎶", "🎸", "🥁", "🎹", "🎺", "🎻", "🎷"];

  return (
    <div style={styles.screen}>
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(60px) rotate(-10deg); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 0.7; }
          100% { transform: translateY(-100px) rotate(10deg); opacity: 0; }
        }
        @keyframes popIn {
          0% { transform: scale(0.7); opacity: 0; }
          70% { transform: scale(1.06); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(192,132,252,0.3); }
          50% { box-shadow: 0 0 0 12px rgba(192,132,252,0); }
        }
      `}</style>
      <div style={styles.finaleContainer}>
        <div style={styles.noteRain}>
          {showNotes && notes.map((n, i) => (
            <div key={i} style={{
              ...styles.floatingNote,
              left: `${5 + i * 12}%`,
              animationDelay: `${i * 0.18}s`,
              fontSize: `${1.3 + (i % 3) * 0.45}rem`,
            }}>{n}</div>
          ))}
        </div>

        <div style={styles.finaleCard}>
          <div style={styles.finaleEmoji}>🎶</div>
          <h1 style={styles.finaleTitle}>QUEUE THE</h1>
          <h1 style={styles.finaleTitleBig}>MUSIC</h1>
          <p style={styles.finaleSubText}>
            Discuss! Who's the imposter?<br />What songs fit the vibe?
          </p>
        </div>

        {/* First player callout */}
        {showFirst && (
          <div style={{ ...styles.firstPlayerCard, animation: "slideUp 0.45s cubic-bezier(0.4,0,0.2,1)" }}>
            <p style={styles.firstPlayerLabel}>🎤 Goes first</p>
            <div style={styles.firstPlayerNameRow}>
              <div style={{ ...styles.firstPlayerBadge, background: firstColor }}>
                {firstPlayerIdx + 1}
              </div>
              <span style={styles.firstPlayerName}>{firstPlayer}</span>
            </div>
            <p style={styles.firstPlayerSub}>Name a song that fits the theme</p>
          </div>
        )}

        <div style={styles.finaleButtons}>
          <button style={styles.nextThemeBtn} onClick={onNext}>Next Theme Word 🎲</button>
          <button style={styles.setupAgainBtn} onClick={onSetup}>Change Players</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    fontFamily: "'Nunito', 'Quicksand', 'Poppins', sans-serif",
    position: "relative",
    overflow: "hidden",
    background: "#FFF8F0",
  },
  bg: {
    position: "fixed",
    inset: 0,
    background: "radial-gradient(ellipse at 20% 10%, #FFE4EC 0%, transparent 50%), radial-gradient(ellipse at 80% 90%, #E0F0FF 0%, transparent 50%), radial-gradient(ellipse at 60% 30%, #FFF3C4 0%, transparent 40%)",
    zIndex: 0,
    pointerEvents: "none",
  },
  screen: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 16px",
    position: "relative",
    zIndex: 1,
  },
  // Setup
  setupContainer: { width: "100%", maxWidth: 420, display: "flex", flexDirection: "column", gap: 24 },
  logoWrap: { textAlign: "center", paddingBottom: 8 },
  logoIcon: { fontSize: "2.8rem", marginBottom: 6, display: "block", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.12))" },
  logo: { margin: 0, fontSize: "2.4rem", fontWeight: 900, letterSpacing: "-0.5px", color: "#3D2C5E" },
  tagline: { margin: "6px 0 0", color: "#9B7EC8", fontSize: "1rem", fontWeight: 600 },
  playersCard: { background: "rgba(255,255,255,0.82)", borderRadius: 24, padding: "24px 20px", boxShadow: "0 8px 32px rgba(100,60,180,0.08)", backdropFilter: "blur(12px)", border: "1.5px solid rgba(255,255,255,0.9)" },
  sectionTitle: { margin: "0 0 16px", fontSize: "1.1rem", fontWeight: 800, color: "#3D2C5E", letterSpacing: "0.5px", textTransform: "uppercase" },
  playerList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 },
  playerRow: { display: "flex", alignItems: "center", gap: 10 },
  playerBadge: { width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem", color: "#3D2C5E", flexShrink: 0, boxShadow: "0 2px 6px rgba(0,0,0,0.1)" },
  playerInput: { flex: 1, border: "1.5px solid #E8DCF5", borderRadius: 12, padding: "10px 14px", fontSize: "0.95rem", fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: "#3D2C5E", background: "#FDFAFF", outline: "none" },
  removeBtn: { width: 32, height: 32, borderRadius: "50%", border: "none", background: "#FFD6D6", color: "#C0392B", fontSize: "1.3rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 700, lineHeight: 1 },
  addBtn: { width: "100%", padding: "11px", borderRadius: 14, border: "2px dashed #D4B3FF", background: "transparent", color: "#9B7EC8", fontSize: "0.95rem", fontWeight: 800, cursor: "pointer", fontFamily: "'Nunito', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 },
  playBtn: { width: "100%", padding: "18px", borderRadius: 20, border: "none", background: "linear-gradient(135deg, #C084FC 0%, #A855F7 100%)", color: "white", fontSize: "1.2rem", fontWeight: 900, cursor: "pointer", fontFamily: "'Nunito', sans-serif", letterSpacing: "0.5px", boxShadow: "0 8px 24px rgba(168,85,247,0.35)" },
  // Reveal
  revealContainer: { width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 },
  progressBar: { width: "100%", height: 6, borderRadius: 99, background: "rgba(0,0,0,0.08)", overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 99, background: "linear-gradient(90deg, #F9A8D4, #C084FC)", transition: "width 0.5s ease" },
  revealHeader: { textAlign: "center", width: "100%" },
  stepLabel: { fontSize: "0.8rem", fontWeight: 800, color: "#9B7EC8", letterSpacing: "1px", textTransform: "uppercase" },
  revealName: { margin: "4px 0 6px", fontSize: "2rem", fontWeight: 900, color: "#3D2C5E" },
  revealInstruction: { margin: 0, color: "#9B7EC8", fontSize: "0.9rem", fontWeight: 600 },
  cardWrapper: { width: "100%", maxWidth: 300, aspectRatio: "3/4", perspective: "1000px" },
  cardScene: { width: "100%", height: "100%", cursor: "pointer", position: "relative" },
  cardInner: { width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d", transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)" },
  cardFront: { position: "absolute", inset: 0, borderRadius: 28, background: "linear-gradient(135deg, #F0E6FF 0%, #E2CCFF 100%)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", boxShadow: "0 16px 48px rgba(168,85,247,0.18), 0 4px 12px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(255,255,255,0.8)" },
  cardFrontInner: { textAlign: "center", padding: 32 },
  cardNote: { fontSize: "3.5rem", display: "block", marginBottom: 16 },
  cardTapText: { margin: "0 0 8px", fontSize: "1.2rem", fontWeight: 900, color: "#3D2C5E" },
  cardSubText: { margin: 0, fontSize: "0.8rem", color: "#9B7EC8", fontWeight: 600, lineHeight: 1.5 },
  cardBack: { position: "absolute", inset: 0, borderRadius: 28, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)", boxShadow: "0 16px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(255,255,255,0.8)", transition: "background 0.1s ease" },
  cardBackInner: { textAlign: "center", padding: "24px 20px" },
  cardEmoji: { fontSize: "2.8rem", display: "block", marginBottom: 10 },
  themeLabel: { margin: "0 0 8px", fontSize: "0.85rem", fontWeight: 700, color: "#3D2C5E", textTransform: "uppercase", letterSpacing: "1px", opacity: 0.7 },
  themeWord: { margin: 0, fontSize: "1.9rem", fontWeight: 900, color: "#3D2C5E", lineHeight: 1.2 },
  imposterLabel: { margin: "0 0 4px", fontSize: "0.9rem", fontWeight: 700, color: "#C0392B", textTransform: "uppercase", letterSpacing: "1px", opacity: 0.8 },
  imposterWord: { margin: "0 0 14px", fontSize: "2.2rem", fontWeight: 900, color: "#C0392B", letterSpacing: "-0.5px" },
  hintBox: { background: "rgba(255,255,255,0.55)", borderRadius: 14, padding: "10px 14px", border: "1px solid rgba(192,56,43,0.15)" },
  hintBoxLabel: { margin: "0 0 4px", fontSize: "0.7rem", fontWeight: 800, color: "#C0392B", textTransform: "uppercase", letterSpacing: "1px", opacity: 0.7 },
  hintBoxText: { margin: 0, fontSize: "0.82rem", color: "#7B2417", fontWeight: 600, lineHeight: 1.5, fontStyle: "italic" },
  passBtn: { width: "100%", padding: "16px", borderRadius: 18, border: "none", background: "linear-gradient(135deg, #34D399 0%, #10B981 100%)", color: "white", fontSize: "1.05rem", fontWeight: 900, cursor: "pointer", fontFamily: "'Nunito', sans-serif", boxShadow: "0 8px 24px rgba(16,185,129,0.3)" },
  hintText: { color: "#C4AEED", fontSize: "0.85rem", fontWeight: 600, margin: 0, textAlign: "center" },
  // Finale
  finaleContainer: { width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", alignItems: "center", gap: 20, position: "relative" },
  noteRain: { position: "absolute", top: -40, left: 0, right: 0, height: 80, pointerEvents: "none", overflow: "visible" },
  floatingNote: { position: "absolute", top: 0, animation: "floatUp 2.5s ease-in-out infinite", userSelect: "none" },
  finaleCard: { width: "100%", background: "rgba(255,255,255,0.9)", borderRadius: 32, padding: "36px 32px 28px", textAlign: "center", boxShadow: "0 16px 48px rgba(100,60,180,0.12)", border: "2px solid rgba(255,255,255,0.95)", backdropFilter: "blur(16px)", animation: "popIn 0.5s cubic-bezier(0.4,0,0.2,1)", marginTop: 48 },
  finaleEmoji: { fontSize: "3rem", marginBottom: 10, display: "block", animation: "pulse 1.5s ease-in-out infinite" },
  finaleTitle: { margin: 0, fontSize: "1.8rem", fontWeight: 900, color: "#9B7EC8", letterSpacing: "2px" },
  finaleTitleBig: { margin: "0 0 16px", fontSize: "3.2rem", fontWeight: 900, letterSpacing: "-1px", lineHeight: 1, background: "linear-gradient(135deg, #C084FC, #F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  finaleSubText: { margin: 0, color: "#9B7EC8", fontSize: "0.92rem", fontWeight: 600, lineHeight: 1.7 },
  firstPlayerCard: {
    width: "100%",
    background: "rgba(255,255,255,0.92)",
    borderRadius: 24,
    padding: "20px 24px",
    boxShadow: "0 8px 32px rgba(168,85,247,0.14), 0 0 0 2px rgba(192,132,252,0.25)",
    border: "2px solid rgba(255,255,255,0.95)",
    animation: "glowPulse 2s ease-in-out infinite",
  },
  firstPlayerLabel: { margin: "0 0 12px", fontSize: "0.8rem", fontWeight: 800, color: "#9B7EC8", textTransform: "uppercase", letterSpacing: "1px" },
  firstPlayerNameRow: { display: "flex", alignItems: "center", gap: 12, marginBottom: 8 },
  firstPlayerBadge: { width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "1rem", color: "#3D2C5E", flexShrink: 0, boxShadow: "0 3px 8px rgba(0,0,0,0.12)" },
  firstPlayerName: { fontSize: "1.6rem", fontWeight: 900, color: "#3D2C5E", letterSpacing: "-0.3px" },
  firstPlayerSub: { margin: 0, fontSize: "0.82rem", color: "#9B7EC8", fontWeight: 600, fontStyle: "italic" },
  finaleButtons: { width: "100%", display: "flex", flexDirection: "column", gap: 12 },
  nextThemeBtn: { width: "100%", padding: "18px", borderRadius: 20, border: "none", background: "linear-gradient(135deg, #C084FC 0%, #A855F7 100%)", color: "white", fontSize: "1.15rem", fontWeight: 900, cursor: "pointer", fontFamily: "'Nunito', sans-serif", boxShadow: "0 8px 24px rgba(168,85,247,0.35)" },
  setupAgainBtn: { width: "100%", padding: "14px", borderRadius: 16, border: "2px solid #E8DCF5", background: "transparent", color: "#9B7EC8", fontSize: "0.95rem", fontWeight: 800, cursor: "pointer", fontFamily: "'Nunito', sans-serif" },
};
