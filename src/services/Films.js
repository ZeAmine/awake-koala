import { useEffect, useState } from 'react';
import Modal from './Modal';
import starempty from '../assets/images/starempty.png';
import starfull from '../assets/images/starfull.png';
import starhalf from '../assets/images/starhalf.png'
import close from '../assets/images/close.png';
import playbutton from '../assets/images/playbutton.png';
const Films = () =>{
const [movie, setMovie] = useState([])
const [credits, setCredits] = useState([])
const [providers, setProviders] = useState([])
const [showModal, setShowModal] = useState(false)
const fetchMovies = () => {
		const url = "https://api.themoviedb.org/3/movie/793723?api_key=f40b8233db44ef498baa757dacc5b165&language=fr"
		fetch(url)
			.then(response => response.json())
			.then(json => setMovie(json))
	}
	useEffect(() => {
		fetchMovies()
	}, [])
const fetchCredits = () => {
		const url = "https://api.themoviedb.org/3/movie/793723/credits?api_key=f40b8233db44ef498baa757dacc5b165"
		fetch(url)
			.then(response => response.json())
			.then(json => setCredits(json))
	}
	useEffect(() => {
		fetchCredits()
	}, [])
const fetchProviders = () => {
	const url = "	https://api.themoviedb.org/3/movie/793723/watch/providers?api_key=f40b8233db44ef498baa757dacc5b165"
	fetch(url)
		.then(response => response.json())
		.then(json => setProviders(json))
}
useEffect(() => {
	fetchProviders()
}, [])
const distribtab = function(){
	if (credits["cast"]){
		let actortab = []
		if (credits["cast"].length < 6){
			for (let i in credits["cast"]){
				if (i < credits["cast"].length){
					actortab.push(credits["cast"][i]["name"]+ ', ')
				} else {
					actortab.push(credits["cast"][i]["name"])
				}
			}
			return actortab

		}
		for (let y = 0; y <= 5; y++){
			if (y < 5){
				actortab.push(credits["cast"][y]["name"]+ ', ')
			} else {
				actortab.push(credits["cast"][y]["name"])
			}
		}
		return actortab
	}
}
const defprod = function(){
	if (credits["crew"]){
		let prod
		for (let v in credits['crew']){
			if(credits["crew"][v]["known_for_department"] == "Directing"){
				prod = credits["crew"][v]["name"]
			}
		}
		return prod
	}
}
const defscena = function (){
	if (credits["cast"]){
		let scenarists = []
		let scenaristsKey = []
		for (let v in credits['cast']){
			if(credits["cast"][v]["known_for_department"] == "Writing"){
				scenaristsKey.push(v)
			}
		}
		for (let o in scenaristsKey){
			if (o != 0){
				scenarists.push(credits["cast"][scenaristsKey[o]]["name"]+', ')
			} else {
				scenarists.push(credits["cast"][scenaristsKey[o]]["name"])
			}
		}
		return scenarists
	}
}
let genrestab = [];
if(movie.genres){
	for (let x in movie.genres){
		if(x < movie.genres.length - 1){
			genrestab.push(movie.genres[x]['name']+ ', ')

		} else{
			genrestab.push(movie.genres[x]['name'])
		}
	}
}
let fncGenre = function(){
	for (let v in genrestab){
		return genrestab
	}
}
const title = movie.original_title
const poster = "https://image.tmdb.org/t/p/w500" + movie.poster_path
const date = movie.release_date
let datetab
if (date){
	datetab = date.split('-')
}
const grade = movie.vote_average / 2
let tab = []
for (let i = 0.5; i <= 5; i+=0.5){
	if(i <= grade){
		tab.push(i)
	}
}
let starstate1 = starempty
let starstate2 = starempty
let starstate3 = starempty
let starstate4 = starempty
let starstate5 = starempty
//ROLLERCOSTER ENTRY :D >>>>
if (tab.includes(0.5)){
	starstate1 = starhalf
	if (tab.includes(1)){
		starstate1 = starfull
		if (tab.includes(1.5)){
			starstate2 = starhalf
			if (tab.includes(2)){
				starstate2 = starfull
				if (tab.includes(2.5)){
					starstate3 = starhalf
					if (tab.includes(3)){
						starstate3 = starfull
						if (tab.includes(3.5)){
							starstate4 = starhalf
							if (tab.includes(4)){
								starstate4 = starfull
								if (tab.includes(4.5)){
									starstate5 = starhalf
									if (tab.includes(5)){
										starstate5 = starfull
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
const defProviders = function(){
	let provArr = []
	if (providers['results']){
		try{
			for (let i in providers['results']["FR"]["flatrate"][0]["provider_name"]){
				if (i != providers['results']["FR"]["flatrate"][0]["provider_name"].length-1){
					provArr.push(providers['results']["FR"]["flatrate"][0]["provider_name"][i]+', ')
				} else{
					provArr.push(providers['results']["FR"]["flatrate"][0]["provider_name"][i])
				}
			}
			return providers['results']["FR"]["flatrate"][0]["provider_name"]
		} catch(err){
			return "Aucune plateforme de streaming"
		}
	}
}
return(
	<div>
	<button onClick={() => setShowModal(true)}>
		{title}
	</button>
	{
		showModal &&
		<Modal onClose={() => setShowModal(false)}>
		{
			closeModal =>
			<div>
				<div className='popup'>
					<div className="exit">
						<button onClick={closeModal}><img src={close} alt="cross-close"/></button>
					</div>
					<div className="content">
						<div className="text-content">
						<h2>{title}</h2>
						<div className="infos">
							<p className="date">{datetab[0]}</p>
							<p>{fncGenre()}</p>

						</div>
						<div className="meta-rating">
							<div className="rating">
								<img className='star' src={starstate1} alt="rating"/>
								<img className='star' src={starstate2} alt="rating"/>
								<img className='star' src={starstate3} alt="rating"/>
								<img className='star' src={starstate4} alt="rating"/>
								<img className='star' src={starstate5} alt="rating"/>
							</div>
							<p className="meta">16+</p>
							<p className="meta">{movie.runtime}m</p>
						</div>
							<div className="textFilm">
							<div className="synopsis">
								<p className="details">{movie.overview}</p>
							</div>
							<div className="distrib">
								<p className="category">R??alisateur</p>
								<p className="details">{defprod()}</p>
								<p className="category">Sc??nariste(s)</p>
								<p className="details">{defscena()}</p>
								<p className="category">Distribution</p>
								<p className="details">{distribtab()}</p>
							</div>
							<div className="disponibility">
								<p className="category">Disponible sur</p>
								<p className="details">{defProviders()}</p>
							</div>
							</div>
						</div>
						<div><img src={poster} alt="movie-poster" className="poster"/></div>
					</div>
					<div className="trailer">
						<p>TRAILER</p>
						<img src={playbutton} alt="playbutton"/>
					</div>
				</div>
			</div>
			}
		</Modal>
	}
	</div>
)
}
export default Films;