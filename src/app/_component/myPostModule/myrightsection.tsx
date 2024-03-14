import styles from "./myrightsection.module.css"
import { useSelector } from "react-redux"
import { RootState } from '@/app/reducers/rootReducer';
import { Doughnut } from "react-chartjs-2"
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);
export default function MyRightSection(){
    const datapost = useSelector((state: RootState) => state.datapost.dataPost);
    const getTopTags = () => {
        const allTags = datapost?.reduce((tags, post) => {
          return tags.concat(post.tags);
        }, [] as string[]);
      
        const tagCount: { [key: string]: number } = {};
      
        if (allTags) {
          allTags.forEach((tag) => {
            const normalizedTag = tag.toLowerCase();
            tagCount[normalizedTag] = (tagCount[normalizedTag] || 0) + 1;
          });
        }
      
        const sortedTags = Object.keys(tagCount).sort(
          (a, b) => tagCount[b] - tagCount[a] || a.localeCompare(b)
        );
      
        return sortedTags.slice(0, 5).map((tag) => ({
          name: tag,
          count: tagCount[tag],
        }));
      };
      
      const topTags = getTopTags();
      
      const chartData = {
        labels: topTags.map((tag) => tag.name),
        datasets: [
          {
            data: topTags.map((tag) => tag.count),
            backgroundColor: ['#FFAFCA', '#546595', '#E9E9EA', '#81D9C0', '#CFD4FA'], // Add more colors as needed
          },
        ],
      };
      
      const chartOptions = {
        cutout: '70%'
      };
    return(
        <div className={styles.chartContainer}>
             <Doughnut className={styles.chart} data={chartData} options={chartOptions} />
            <div className={styles.labelsContainer}>
              {topTags.map((tag, index) => (
                <div key={index} className={styles.chartLabel}>
                  {tag.name}: {tag.count}
                </div>
              ))}
          </div>
        </div>
    )
}