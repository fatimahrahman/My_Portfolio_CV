import React from 'react';
import { BlobProvider, Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { PortfolioData } from '../types';

// Use built-in PDF fonts to avoid remote font issues
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Times-Roman',
    paddingTop: 34,
    paddingBottom: 34,
    paddingLeft: 34,
    paddingRight: 34,
    backgroundColor: '#ffffff',
    color: '#0f172a',
    fontSize: 8.5,
    lineHeight: 1.42,
  },
  header: { textAlign: 'center', marginBottom: 10 },
  name: { fontSize: 22, color: '#0f172a', fontFamily: 'Times-Bold', marginBottom: 6, lineHeight: 1.2 },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    fontSize: 8,
  },
  contactLink: { color: '#475569', textDecoration: 'none' },
  separator: { marginHorizontal: 6, color: '#475569' },
  hairline: { marginTop: 6, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#cbd5e1' },
  section: { marginBottom: 14 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#0f172a',
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: '#0f172a',
    marginBottom: 8,
  },
  listItem: { marginLeft: 10, marginBottom: 3 },
  job: { marginBottom: 9 },
  jobHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  jobTitle: { fontSize: 11, fontWeight: 700, color: '#0f172a' },
  jobPeriod: { fontSize: 8, color: '#64748b' },
  jobCompany: { fontWeight: 500, color: '#334155' },
  jobDescription: { marginTop: 4 },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  skillTag: {
    backgroundColor: '#f0fdfa',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 12,
    marginRight: 5,
    marginBottom: 5,
  },
  skillText: { color: '#115e59', fontSize: 9 },
  project: { marginBottom: 10 },
  projectTitle: { fontSize: 12, fontWeight: 600 },
});

interface CVDocumentProps { data: PortfolioData }

const CVDocument: React.FC<CVDocumentProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{data.personal.name}</Text>
        <View style={styles.contactInfo}>
          {(() => {
            const items: Array<{key: string; node: React.ReactNode}> = [];
            const c = data.personal.contact;
            if (c.location) items.push({ key: 'loc', node: <Text style={styles.contactLink}>{c.location}</Text> });
            if (c.email) items.push({ key: 'em', node: <Link src={`mailto:${c.email}`} style={styles.contactLink}>{c.email}</Link> });
            if (c.phone) items.push({ key: 'ph', node: <Text style={styles.contactLink}>{c.phone}</Text> });
            if (c.linkedin) items.push({ key: 'li', node: <Link src={c.linkedin} style={styles.contactLink}>{c.linkedin}</Link> });
            if (c.github) items.push({ key: 'gh', node: <Link src={c.github} style={styles.contactLink}>{c.github}</Link> });
            return items.map((item, i) => (
              <View key={item.key} style={{ flexDirection: 'row', alignItems: 'center' }}>
                {i > 0 && <Text style={styles.separator}>•</Text>}
                {item.node}
              </View>
            ));
          })()}
        </View>
        <View style={styles.hairline} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SUMMARY</Text>
        <Text>{data.summary.introduction}</Text>
        {Array.isArray(data.summary.body) && data.summary.body.map((p, i) => {
          const shouldHighlight = /message|queue|cach|react/i.test(p);
          const style: any = { marginTop: 5 };
          if (shouldHighlight) style.backgroundColor = '#e9fbf2';
          return (
            <Text key={i} style={style}>{p}</Text>
          );
        })}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EXPERIENCE</Text>
        {data.experience.map((job, i) => (
          <View key={i} style={styles.job}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.jobPeriod}>{job.period}{job.location ? `, ${job.location}` : ''}</Text>
            </View>
            <Text style={styles.jobCompany}>{job.company}{job.location ? `, ${job.location}` : ''}</Text>
            <View style={styles.jobDescription}>
              {job.description.map((desc, di) => (
                <View key={di} style={styles.listItem}>
                  <Text>• {desc}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SKILLS</Text>
        <View style={styles.skillsContainer}>
          {data.skills.map((skill, i) => (
            <View key={i} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {!!data.projects?.length && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROJECTS</Text>
          {data.projects.map((project, i) => (
            <View key={i} style={styles.project}>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <Text>{project.description}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EDUCATION</Text>
        {data.education.map((edu, i) => (
          <View key={i}>
            <Text style={styles.jobTitle}>{edu.degree}</Text>
            <Text>{edu.institution} - {edu.period}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

interface CVDownloadProps { data: PortfolioData }

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const CVDownload: React.FC<CVDownloadProps> = ({ data }) => {
  const docKey = React.useMemo(() => {
    const sig = JSON.stringify({
      s: data.summary?.introduction,
      sk: data.skills?.map(s => s.name),
      ex: data.experience?.map(e => [e.title, e.company]),
      pr: data.projects?.map(p => p.title),
    });
    return sig;
  }, [data]);

  // Compute total years of experience from experience periods
  const filename = React.useMemo(() => {
    const monthMap: Record<string, number> = {
      jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
      jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
    };
    const parsePart = (part?: string) => {
      if (!part) return null;
      const m = part.trim().toLowerCase().match(/([a-z]{3,})\s+(\d{4})/);
      if (!m) return null;
      const mi = monthMap[m[1].slice(0,3)];
      const y = parseInt(m[2], 10);
      if (Number.isNaN(mi) || Number.isNaN(y)) return null;
      return new Date(y, mi, 1);
    };
    const ranges = (data.experience || []).map(e => {
      const [startRaw, endRaw] = (e.period || '').split('-');
      const start = parsePart(startRaw || '');
      let end: Date | null = null;
      if (/present/i.test(endRaw || '')) end = new Date();
      else end = parsePart(endRaw || '');
      return { start, end };
    }).filter(r => r.start);

    let earliest = ranges.reduce<Date | null>((acc, r) => {
      if (!r.start) return acc;
      return !acc || r.start < acc ? r.start : acc;
    }, null);
    const latest = new Date();
    let years = 0;
    if (earliest) {
      const months = (latest.getFullYear() - earliest.getFullYear()) * 12 + (latest.getMonth() - earliest.getMonth());
      years = Math.max(0, months / 12);
    }
    const yearsStr = years ? `${years.toFixed(1)}yrs` : 'CV';
    const base = data.personal.name.trim().replace(/\s+/g, '_');
    return `${base}_${yearsStr}.pdf`;
  }, [data]);

  return (
    <BlobProvider key={docKey} document={<CVDocument data={data} />}> 
      {({ url, loading, error, blob }) => {
        const handleClick = () => {
          if (!url) return;
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          a.remove();
        };

        return (
          <button
            onClick={handleClick}
            disabled={loading || !!error}
            className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${loading || error ? 'bg-teal-400 text-white cursor-not-allowed' : 'text-white bg-teal-600 hover:bg-teal-700 focus:ring-teal-500'}`}
            aria-disabled={loading || !!error}
          >
            {loading ? 'Generating CV...' : error ? 'Unable to generate CV' : (<><DownloadIcon/> Download CV</>)}
          </button>
        );
      }}
    </BlobProvider>
  );
};

export default CVDownload;
