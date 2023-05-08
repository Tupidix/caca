import { select } from "d3-selection";
import { csv } from "d3-fetch";

//#79 Wii Party
let tableauJeuxVideos = [
	{
		name: "Wii Sports",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Mario",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Pokemon",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Tetris",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Wii Play",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Duck Hunt",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Nintendogs",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Wii Fit",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Kinect",
		company: "MicrosoftGameStudios",
		amount: "",
		genre: "",
	},
	{
		name: "Grand Theft Auto",
		company: "Take-TwoInteractive",
		amount: "",
		genre: "",
	},
	{
		name: "Brain Age",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Gran Turismo",
		company: "SonyComputerEntertainment",
		amount: "",
		genre: "",
	},
	{
		name: "Call of Duty",
		company: "Activision",
		amount: "",
		genre: "",
	},
	{
		name: "Super Smash Bros.",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Animal Crossing",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Halo",
		company: "MicrosoftGameStudios",
		amount: "",
		genre: "",
	},
	{
		name: "Just Dance",
		company: "Ubisoft",
		amount: "",
		genre: "",
	},
	{
		name: "Final Fantasy",
		company: "SquareSoft",
		amount: "",
		genre: "",
	},
	{
		name: "Minecraft",
		company: "MicrosoftGameStudios",
		amount: "",
		genre: "",
	},
	{
		name: "The Elder Scrolls",
		company: "BethesdaSoftworks",
		amount: "",
		genre: "",
	},
	{
		name: "FIFA",
		company: "ElectronicArts",
		amount: "",
		genre: "",
	},
	{
		name: "The Sims",
		company: "ElectronicArts",
		amount: "",
		genre: "",
	},
	{
		name: "GoldenEye",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Pac-Man",
		company: "Atari",
		amount: "",
		genre: "",
	},
	{
		name: "Star Wars",
		company: "ElectronicArts",
		amount: "",
		genre: "",
	},
	{
		name: "Zelda",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Crash Bandicoot",
		company: "SonyComputerEntertainment",
		amount: "",
		genre: "",
	},
	{
		name: "Battlefield",
		company: "ElectronicArts",
		amount: "",
		genre: "",
	},
	{
		name: "Sonic",
		company: "SEGA",
		amount: "",
		genre: "",
	},
	{
		name: "Red Dead Redemption",
		company: "Take-TwoInteractive",
		amount: "",
		genre: "",
	},
	{
		name: "Borderlands",
		company: "Take-TwoInteractive",
		amount: "",
		genre: "",
	},
	{
		name: "Tekken",
		company: "SonyComputerEntertainment",
		amount: "",
		genre: "",
	},
	{
		name: "World of Warcraft",
		company: "Activision",
		amount: "",
		genre: "",
	},
	{
		name: "Destiny",
		company: "Activision",
		amount: "",
		genre: "",
	},
	{
		name: "Assassin's Creed",
		company: "Ubisoft",
		amount: "",
		genre: "",
	},
	{
		name: "Watch Dogs",
		company: "Ubisoft",
		amount: "",
		genre: "",
	},
	{
		name: "Fallout",
		company: "BethesdaSoftworks",
		amount: "",
		genre: "",
	},
	{
		name: "Dragon Quest",
		company: "SquareSoft",
		amount: "",
		genre: "",
	},
	{
		name: "Kingdom Hearts",
		company: "SquareSoft",
		amount: "",
		genre: "",
	},
];
//console.log(tableauJeuxVideos);
let largeur = window.innerWidth - 100;
let tableauPublisher10 = [];

select("body").append("div").attr("id", "bulleEntreprise");

select("#bulleEntreprise")
	.append("svg")
	.attr("height", "800px")
	.attr("width", largeur);

csv("dataset/vgsales.csv").then(function (data) {
	let tableauPublisher = [...new Set(data.map((d) => d.Publisher))];
	//console.log(data);
	for (let i = 0; i < 10; i++) {
		let publisher = tableauPublisher[i];
		let publisherSansEspace = publisher.split(" ").join("");
		tableauPublisher10.push(publisherSansEspace);
	}
	//console.log(tableauPublisher10);

	tableauPublisher10.forEach((publisher) => {
		select("svg")
			.append("a")
			.attr("href", `pageEntreprise/${publisher}.html`)
			.attr("id", `${publisher}`);

		select(`#${publisher}`)
			.append("image")
			.attr("xlink:href", `images/logoEntreprise/${publisher}.svg`)
			.attr("width", "290px")
			.attr("x", Math.random() * (largeur - 290))
			.attr("y", Math.random() * (800 - 290));
	});

	const chercheMot = (mot) => {
		let count = 0;
		data.forEach((jeu) => {
			if (jeu.Name.includes(mot)) {
				count++;
			}
		});
		return count;
	};

	const chercheGenre = (mot) => {
		let tableauALEnvers = data.reverse();
		//console.log(tableauALEnvers);
		let genre = "";
		tableauALEnvers.forEach((jeu) => {
			if (jeu.Name.includes(mot)) {
				genre = jeu.Genre;
			}
		});
		return genre;
	};

	tableauJeuxVideos.forEach((jeu) => {
		let motAChercher = jeu.name;
		jeu.amount = chercheMot(motAChercher);
		jeu.genre = chercheGenre(motAChercher);
	});
	//console.log(tableauJeuxVideos);
});
