import React from 'react'
import Rocketimg from "../../../assets/images/homeroc.png"
import { Link } from 'react-router-dom'
import RecentBlogs from './RecentBlogs'

function Home() {

	const scrollToSection = (event) => {
		event.preventDefault();
		const targetSection = document.querySelector("#Blogs");
		if (targetSection) {
			window.scrollTo({
				top: targetSection.offsetTop,
				behavior: "smooth"
			});
		}
	};

	return (
		<>
			<div className="mainContainer">
				<div style={{ "width": " 100%" }}>
					<div className="left" style={{ "margin": " 0 auto" }}>
						<h1 className="mainHeading" data-aos="fade-right">
							<span style={{ "color": " var(--secondary)" }}>SEDS</span> Blogs
						</h1>
					</div>
					<div style={{ "textAlign": " center" }}>

						<Link className="btn btn-primary" to="#Blogs"  onClick={scrollToSection}>
							<h2 style={{ "margin": " 0" }}>Explore</h2>
						</Link>
						<Link className="btn btn-primary ms-2" to="Editor/">
							<h2 style={{ "margin": " 0" }}>Contribute</h2>
						</Link>
					</div>
				</div>

				<div className="mainBottomWrapper">
					<img className="mainBottomImage" src={Rocketimg} alt="" />
				</div>
			</div>
			<RecentBlogs />
		</>
	)
}

export default Home