import { select } from "d3-selection";
import { csv } from "d3-fetch";
import * as d3 from "d3";

let largeur = window.innerWidth - 100;

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

csv("dataset/vgsales.csv").then(function (data) {
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
	console.table(tableauJeuxVideos);
});

select("body").append("div").attr("id", "chart");

(function () {
	var width = 500,
		height = 500;

	var svg = select("#chart")
		.append("svg")
		.attr("width", largeur)
		.attr("height", "1000px")
		.append("g")
		.attr("transform", "translate(0,0)");

	var radiusScale = d3.scaleSqrt().domain([1, 102]).range([50, 100]);

	var simulation = d3
		.forceSimulation()
		.force("x", d3.forceX(700).strength(0.05))
		.force("y", d3.forceY(500).strength(0.05))
		.force(
			"collide",
			d3.forceCollide(function (d) {
				return radiusScale(d.amount);
			})
		);

	var circles = svg
		.selectAll(".licence")
		.data(tableauJeuxVideos)
		.enter()
		.append("circle")
		.attr("class", "licence")
		.attr("r", function (d) {
			console.log(d.amount);
			return radiusScale(d.amount);
		})
		.attr("fill", "red");

	simulation.nodes(tableauJeuxVideos).on("tick", ticked);

	function ticked() {
		circles
			.attr("cx", function (d) {
				return d.x;
			})
			.attr("cy", function (d) {
				return d.y;
			});
	}
})();
