import java.io.*;
import java.util.Random;
import java.util.*;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.apache.poi.ss.usermodel.*;



public class KNN {


    public static void main(String[] args) {
        List<Point> dataset = readCSVFile("Book_dataset.csv");

        Point testPoint = new Point(2,20, null);
        int K = 50;
        Point testPoint1 = new Point(1,20, null);
        int K1 = 30;
        Point testPoint2 = new Point(3,20, null);
        int K2 = 20;

        List<Point> neighbors = findNearestNeighbors(dataset, testPoint, K);
        List<Point> neighbors1 = findNearestNeighbors(dataset, testPoint1, K1);
        List<Point> neighbors2 = findNearestNeighbors(dataset, testPoint2, K2);


        List<String> majorityClasses = Collections.singletonList(getMajoriyClass(neighbors));
        List<String> majorityClasses1 = Collections.singletonList(getMajoriyClass(neighbors1));
        List<String> majorityClasses2 = Collections.singletonList(getMajoriyClass(neighbors2));

        List<String> maj = new ArrayList<String>(majorityClasses);
        List<String> maj1 = new ArrayList<String>(majorityClasses1);
        List<String> maj2 = new ArrayList<String>(majorityClasses2);

        List<String> index1 = Arrays.asList(maj.toString());
        String[] booknamesArray = index1.get(0).split(", ");
        List<String> booknames = new ArrayList<>(Arrays.asList(booknamesArray));

        List<String> index2 = Arrays.asList(maj1.toString());
        String[] booknamesArray2 = index2.get(0).split(", ");
        List<String> booknames2 = new ArrayList<>(Arrays.asList(booknamesArray2));

        List<String> index3 = Arrays.asList(maj2.toString());
        String[] booknamesArray3 = index2.get(0).split(", ");
        List<String> booknames3 = new ArrayList<>(Arrays.asList(booknamesArray3));

        List<String> ans = new ArrayList<String>();
        List<String> ans1 = new ArrayList<String>();
        List<String> ans2 = new ArrayList<String>();

        Random random = new Random();
        for(int i = 0 ; i < 5 ; i++) {
            String randomString = booknames.remove(random.nextInt(booknames.size()));
            ans.add(randomString);
        }

        for(int i = 0 ; i < 3 ; i++) {
            String randomString = booknames2.remove(random.nextInt(booknames2.size()));
            ans1.add(randomString);
        }

        for(int i = 0 ; i < 2 ; i++) {
            String randomString = booknames3.remove(random.nextInt(booknames3.size()));
            ans2.add(randomString);
        }

        String listString = ans.toString();
        listString = listString.replace("[","").replace("]","");
        List<String> S = Arrays.asList(listString.split(", "));

        String listString1 = ans1.toString();
        listString1 = listString1.replace("[","").replace("]","");
        List<String> S1 = Arrays.asList(listString1.split(","));

        String listString2 = ans2.toString();
        listString2 = listString2.replace("[","").replace("]","");
        List<String> S2 = Arrays.asList(listString2.split(","));

        System.out.println(S);
        System.out.println(S1);
        System.out.println(S2);

    }

    private static List<Point> findNearestNeighbors(List<Point> dataset, Point testPoint , int K) {
        PriorityQueue<PointDistance> pq = new PriorityQueue<>(Comparator.comparing(PointDistance::getDistance).reversed());

        for(Point p : dataset) {
            double distance = Math.sqrt(Math.pow(p.feature2 - testPoint.feature2, 2) + Math.pow(p.feature3 - testPoint.feature3, 2)
            );
            pq.offer(new PointDistance(p, distance));

            if(pq.size() > K) {
                pq.poll();
            }
        }

        List<Point> neighbors = new ArrayList<>();
        while(!pq.isEmpty()) {
            neighbors.add(pq.poll().point);
        }
        Collections.reverse(neighbors);
        return neighbors;
    }

    private static String getMajoriyClass(List<Point> neighbors) {
        Map<String, Integer> freq= new HashMap<>();
        int maxFreq = 0;

        for(Point p : neighbors) {
            int count = freq.getOrDefault(p.label, 0 ) +1;
            freq.put(p.label, count);
            maxFreq = Math.max(maxFreq, count);
        }
        List<String> majorityClasses = new ArrayList<>();
        for(Map.Entry<String, Integer> entry : freq.entrySet()) {
            if(entry.getValue() == maxFreq) {
                majorityClasses.add(entry.getKey());
            }
        }

        return majorityClasses.toString();
    }

    public static List<Point> readCSVFile(String filename) {
        List<Point> dataset = new ArrayList<>();

        try {
            FileInputStream inputStream = new FileInputStream(filename);
            InputStreamReader streamReader = new InputStreamReader(inputStream, "EUC-KR");
            CSVParser parser = CSVParser.parse(streamReader, CSVFormat.DEFAULT);
            DataFormatter dataFormatter = new DataFormatter();

            for(CSVRecord row : parser) {
                //double feature1 = Double.parseDouble(row.get(0));
                double feature2 = Double.parseDouble(row.get(1));
                double feature3 = Double.parseDouble(row.get(2));
                //double feature4 = Double.parseDouble(row.get(3));
                //double feature5 = Double.parseDouble(row.get(4));

                String label = row.get(4);

                dataset.add(new Point(feature2, feature3 , label));
            }
        }
        catch(Exception e) {
            e.printStackTrace();
        }

        return dataset;
    }

    private static class Point{
        //double feature1;
        double feature2;
        double feature3;
        //double feature4;
       // double feature5;
        String label;

        public Point( double feature2, double feature3,  String label){
            //this.feature1 = feature1;
            this.feature2 = feature2;
            this.feature3 = feature3;
            //this.feature4 = feature4;
            //this.feature5 = feature5;
            this.label = label;
        }

        public String toString() {
            return "(" +  feature2 + "," + feature3 + ")";
        }
    }

    private static class PointDistance {
        Point point;
        double distance;

        public PointDistance(Point point, double distance) {
            this.point=  point;
            this.distance = distance;
        }

        public double getDistance() {
            return distance;
        }
    }


}