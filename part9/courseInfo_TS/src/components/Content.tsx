import { CoursePart, CourseProps } from '../types';
import * as helpers from '../helpers';

const Part = ({ course }: { course: CoursePart }) => {
  const renderContent = () => {
    switch (course.kind) {
      case 'basic':
        return <i>{course.description}</i>;
      case 'group':
        return <>Group projects: {course.groupProjectCount}</>;
      case 'background':
        return (
          <>
            <i>{course.description}</i>
            <p>See in: {course.backgroundMaterial}</p>
          </>
        );
      case 'special':
        // eslint-disable-next-line no-case-declarations
        const requirements = course.requirements.join(',');
        return (
          <>
            <i>{course.description}</i>
            <p>Requires skills: {requirements}</p>
          </>
        );
      default:
        return helpers.assertNever(course);
    }
  };

  const contentToRender = renderContent();

  return (
    <div style={{ marginBottom: '12px' }}>
      <b>
        {course.name} {course.exerciseCount}
      </b>
      <div>{contentToRender}</div>
    </div>
  );
};

// Passing in props that has shape of CourseProps, and destctucture it in place
const Content = ({ courseParts }: CourseProps) => {
  return courseParts.map((course) => {
    return (
      <div key={course.name}>
        <Part course={course} />
      </div>
    );
  });
};

export default Content;
