import React, { Component } from 'react';

import { serverURL } from '../App';

export class About extends Component {
	render() {
		return (
			<div>
				<h1>About</h1>
				<br />
				<p>    This website is meant to provide a functional database from which an HR Department could add another dimension to their hiring process. Hiring in the traditional sense is very far-removed and impersonal, which <br />
					can result in problems with hired candidates. Although credentials and knowledge can be great indicators of an applicant's potential, their personality will most likely determine how they will fit into the organization <br />
					as a whole. It can also be an indicator of their success and overall happiness in their new role, which can prevent costly situations for a company such as decreased performance/productivity, toxic culture, and <br />
					high turnover. Departments can also be more proactive and tailor their search to the type of person they most likely need; someone who can complement their current workgroup and fill deficiencies. With every new entry <br />
					into the system, the MBTI of each applicant is compared to the MBTI desired by current open roles, if a match occurs, it is added to the match table.
					</p>
				<br />
				<h2 >MBTI Basics</h2>
				<br />
				<p>The purpose of the Myers-Briggs Type Indicator® (MBTI®) personality inventory is to make the theory of psychological types described by C. G. Jung understandable and useful in people's lives. The essence of the theory is that <br />
					much seemingly random variation in the behavior is actually quite orderly and consistent, being due to basic differences in the ways individuals prefer to use their perception and judgment.</p>
				<p>"Perception involves all the ways of becoming aware of things, people, happenings, or ideas. Judgment involves all the ways of coming to conclusions about what has been perceived. If people differ systematically in what they <br />
					perceive and in how they reach conclusions, then it is only reasonable for them to differ correspondingly in their interests, reactions, values, motivations, and skills."</p>
				<p>In developing the Myers-Briggs Type Indicator [instrument], the aim of Isabel Briggs Myers, and her mother, Katharine Briggs, was to make the insights of type theory accessible to individuals and groups. They addressed the two <br />
					related goals in the developments and application of the MBTI instrument:</p>
				<ol>
					<li>The identification of basic preferences of each of the four dichotomies specified or implicit in Jung's theory.</li>
					<li>The identification and description of the 16 distinctive personality types that result from the interactions among the preferences."</li>
				</ol>
				<p><em>Excerpted with permission from the MBTI® Manual: A Guide to the Development and Use of the Myers-Briggs Type Indicator®</em></p>
				<p>Favorite world: Do you prefer to focus on the outer world or on your own inner world? This is called Extraversion (E) or Introversion (I).</p>
				<p>Information: Do you prefer to focus on the basic information you take in or do you prefer to interpret and add meaning? This is called Sensing (S) or Intuition (N).</p>
				<p>Decisions: When making decisions, do you prefer to first look at logic and consistency or first look at the people and special circumstances? This is called Thinking (T) or Feeling (F).</p>
				<p>Structure: In dealing with the outside world, do you prefer to get things decided or do you prefer to stay open to new information and options? This is called Judging (J) or Perceiving (P).</p>
				<br />

				<h3>The 16 personality types of the Myers-Briggs Type Indicator®</h3>
				<br />
				<ol>
					<li><b>ISTJ: </b> Quiet, serious, earn success by thoroughness and dependability. Practical, matter-of-fact, realistic, and responsible. Decide logically what should be done and work toward it steadily, regardless of distractions. <br />
						Take pleasure in making everything orderly and organized - their work, their home, their life. Value traditions and loyalty.</li>
					<li><b>ISFJ: </b>Quiet, friendly, responsible, and conscientious. Committed and steady in meeting their obligations. Thorough, painstaking, and accurate. Loyal, considerate, notice and remember specifics about people who are <br />
						important to them, concerned with how others feel. Strive to create an orderly and harmonious environment at work and at home.</li>
					<li><b>INFJ: </b>Seek meaning and connection in ideas, relationships, and material possessions. Want to understand what motivates people and are insightful about others. Conscientious and committed to their firm values. Develop a <br />
						clear vision about how best to serve the common good. Organized and decisive in implementing their vision.</li>
					<li><b>INTJ: </b>Have original minds and great drive for implementing their ideas and achieving their goals. Quickly see patterns in external events and develop long-range explanatory perspectives. When committed, organize a job and <br />
						carry it through. Skeptical and independent, have high standards of competence and performance - for themselves and others.</li>
					<li><b>ISTP: </b>Tolerant and flexible, quiet observers until a problem appears, then act quickly to find workable solutions. Analyze what makes things work and readily get through large amounts of data to isolate the core of practical <br />
						problems. Interested in cause and effect, organize facts using logical principles, value efficiency.</li>
					<li><b>ISFP: </b>Quiet, friendly, sensitive, and kind. Enjoy the present moment, what's going on around them. Like to have their own space and to work within their own time frame. Loyal and committed to their values and to people who are <br />
						important to them. Dislike disagreements and conflicts, do not force their opinions or values on others.</li>
					<li><b>INFP: </b>Idealistic, loyal to their values and to people who are important to them. Want an external life that is congruent with their values. Curious, quick to see possibilities, can be catalysts for implementing ideas. Seek to <br />
						understand people and to help them fulfill their potential. Adaptable, flexible, and accepting unless a value is threatened.</li>
					<li><b>INTP: </b>Seek to develop logical explanations for everything that interests them. Theoretical and abstract, interested more in ideas than in social interaction. Quiet, contained, flexible, and adaptable. Have unusual ability to <br />
						focus in depth to solve problems in their area of interest. Skeptical, sometimes critical, always analytical.</li>
					<li><b>ESTP: </b>Flexible and tolerant, they take a pragmatic approach focused on immediate results. Theories and conceptual explanations bore them - they want to act energetically to solve the problem. Focus on the here-and-now, spontaneous, <br />
						enjoy each moment that they can be active with others. Enjoy material comforts and style. Learn best through doing.</li>
					<li><b>ESFP: </b>Outgoing, friendly, and accepting. Exuberant lovers of life, people, and material comforts. Enjoy working with others to make things happen. Bring common sense and a realistic approach to their work, and make work fun. Flexible <br />
						and spontaneous, adapt readily to new people and environments. Learn best by trying a new skill with other people.</li>
					<li><b>ENFP: </b>Warmly enthusiastic and imaginative. See life as full of possibilities. Make connections between events and information very quickly, and confidently proceed based on the patterns they see. Want a lot of affirmation from others, <br />
						and readily give appreciation and support. Spontaneous and flexible, often rely on their ability to improvise and their verbal fluency.</li>
					<li><b>ENTP: </b>Quick, ingenious, stimulating, alert, and outspoken. Resourceful in solving new and challenging problems. Adept at generating conceptual possibilities and then analyzing them strategically. Good at reading other people. Bored by <br />
						routine, will seldom do the same thing the same way, apt to turn to one new interest after another.</li>
					<li><b>ESTJ: </b>Practical, realistic, matter-of-fact. Decisive, quickly move to implement decisions. Organize projects and people to get things done, focus on getting results in the most efficient way possible. Take care of routine details. Have <br />
						a clear set of logical standards, systematically follow them and want others to also. Forceful in implementing their plans.</li>
					<li><b>ESFJ: </b>Warmhearted, conscientious, and cooperative. Want harmony in their environment, work with determination to establish it. Like to work with others to complete tasks accurately and on time. Loyal, follow through even in small matters.<br />
						Notice what others need in their day-by-day lives and try to provide it. Want to be appreciated for who they are and for what they contribute.</li>
					<li><b>ENFJ: </b>Warm, empathetic, responsive, and responsible. Highly attuned to the emotions, needs, and motivations of others. Find potential in everyone, want to help others fulfill their potential. May act as catalysts for individual and group <br />
						growth. Loyal, responsive to praise and criticism. Sociable, facilitate others in a group, and provide inspiring leadership.</li>
					<li><b>ENTJ: </b>Frank, decisive, assume leadership readily. Quickly see illogical and inefficient procedures and policies, develop and implement comprehensive systems to solve organizational problems. Enjoy long-term planning and goal setting.<br />
						Usually well informed, well read, enjoy expanding their knowledge and passing it on to others. Forceful in presenting their ideas.</li>
				</ol>
				<p><em>Excerpted with permission from the MBTI® Manual: A Guide to the Development and Use of the Myers-Briggs Type Indicator®</em></p>

				<p><em><b>All information taken from https://www.myersbriggs.org/</b></em></p>
			</div>
		);
	}
}