'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ProjectLink from '@/app/projects/projectLink';
import Modal from '@/app/projects/project/modal';
import Layout from '@/components/layout';
import { ModalContext } from './modalContext';

const projects = [
  {
    title: 'Paint Application',
    src: 'bltkq/controller.jpg',
    description:
      'Paint Your Heart Out',
    href: '/projects/bltkq',
    tag: 'Live Application',
    color: '#000000'
  },
  {
    title: 'Pixel Art',
    src: 'pa/astronaut-square.png',
    href: '/projects/pa',
    tag: 'Art',
    color: '#ee5622'
  }

];

export default function ProjectsHome() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      <Layout title={'Projects'}>
        <div className="m-0">
          <div className="m-0 overflow-hidden">
            {projects.map((project, index) => {
              return (
                <Link href={project.href} key={index}>
                  <ProjectLink
                    index={index}
                    title={project.title}
                    tag={project.tag}
                  />
                </Link>
              );
            })}
          </div>
          <Modal projects={projects} />
        </div>
      </Layout>
    </ModalContext.Provider>
  );
}
