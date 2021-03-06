import React, { useEffect } from 'react';
import './projects.scss';
import projectsData from '../../shared/projects-data';
import { NavLink } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-88938949-5');

let coverLinks = projectsData.data.filter(project => project.coverPhoto && project.coverPhoto.length > 0).map(project => require("../../shared/assets/images/" + project.coverPhoto).default);


export const Projects = () => {
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
        coverLinks.forEach((link) => {
            new Image().src = link;
        });
    }, []);

    return (
        <Container>
            <div className="projects-container page-container">
                <h1>Projects</h1>
                <Container>
                    <Row xs={1} lg={2} className="g-4">
                        {projectsData.data.map(project =>
                            <Col key={project.title}>
                                <Card className="project-div bg-light h-70">
                                    {project.coverPhoto && project.coverPhoto.length > 0 ?
                                        (project.externalLink.length > 0 ?
                                            <a href={project.externalLink} target="_blank" rel="noreferrer noopener">
                                                <Card.Img variant="top" src={require("../../shared/assets/images/" + project.coverPhoto).default} alt={project.title + " Image"} />
                                            </a>
                                            : <Card.Img varaint="top" src={require("../../shared/assets/images/" + project.coverPhoto).default} alt={project.title + " Image"} />)
                                        : null
                                    }
                                    <Card.Body>
                                        <Card.Title>{project.title}</Card.Title>
                                        <Card.Text>{project.preview}</Card.Text>
                                        <div className="tag-container">
                                            {project.tags.map((tag) => (
                                                <div key={project.title+tag} className="tag">
                                                    {tag}
                                                </div>
                                            ))}
                                        </div>
                                    </Card.Body>
                                    <Card.Footer>
                                        {project.path && project.path.length > 0 ?
                                            <NavLink to={"/projects/" + project.path}>Read more</NavLink>
                                            : (project.externalLink && project.externalLink.length > 0 ?
                                                <a href={project.externalLink} target="_blank" rel="noreferrer noopener">Read more</a> : null
                                            )}
                                    </Card.Footer>
                                </Card>
                            </Col>)
                        }
                    </Row>
                </Container>
            </div>
        </Container>
    )
}