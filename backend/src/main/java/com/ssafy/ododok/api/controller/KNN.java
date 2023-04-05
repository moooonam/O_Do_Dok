package com.ssafy.ododok.api.controller;

import java.io.*;
import java.util.Random;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.ododok.db.model.Book;
import com.ssafy.ododok.db.model.Team;
import com.ssafy.ododok.db.repository.BookRepository;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Controller;

import java.util.*;


@Controller
public class KNN {

    private final BookRepository bookRepository;


    public KNN(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<String> knn(Team team) {
//        List<Point> dataset = readCSVFile("Book_dataset.csv");
        List<Point> dataset = new ArrayList<>();
        List<Book> recomlist = bookRepository.findAll();
        for(Book recomBook : recomlist){
            dataset.add(new Point(recomBook.getRecomBookGenre(), recomBook.getRecomBookAge(), recomBook.getBookTitle()));
        }
        System.out.println(dataset.toString());

        List<String> list = new ArrayList<>();
        list.add(team.getTeamGenre1());
        list.add(team.getTeamGenre2());
        list.add(team.getTeamGenre3());
        System.out.println(list.get(0)+" "+list.get(1)+" "+list.get(2));

        List<Integer> numList = new ArrayList<>();

        for(int i=0; i<list.size(); i++) {
            String genre = list.get(i);

            switch (genre) {
                case "추리":
                    numList.add(1);
                    break;
                case "판타지":
                    numList.add(2);
                    break;
                case "SF":
                    numList.add(3);
                    break;
                case "호러":
                    numList.add(4);
                    break;
                case "무협":
                    numList.add(5);
                    break;
                case "스릴러":
                    numList.add(6);
                    break;
                case "로맨스":
                    numList.add(7);
                    break;
            }
        }

        double age = team.getTeamAge();

        if(age >= 20 && age < 30) age = 20;
        else if(age >= 30 && age < 40) age = 30;
        else if(age >= 40 && age < 50) age = 40;
        else age = 50;

        System.out.println("age? : " + age);

        Point testPoint1 = new Point(numList.get(0),age, null);
        int K1 = 10;
        Point testPoint2 = new Point(numList.get(1),age, null);
        int K2 = 10;
        Point testPoint3 = new Point(numList.get(2),age, null);
        int K3 = 10;

        List<Point> neighbors1 = findNearestNeighbors(dataset, testPoint1, K1);
        List<Point> neighbors2 = findNearestNeighbors(dataset, testPoint2, K2);
        List<Point> neighbors3 = findNearestNeighbors(dataset, testPoint3, K3);

        List<String> majorityClasses1 = Collections.singletonList(getMajoriyClass(neighbors1));
        List<String> majorityClasses2 = Collections.singletonList(getMajoriyClass(neighbors2));
        List<String> majorityClasses3 = Collections.singletonList(getMajoriyClass(neighbors3));

        List<String> maj1 = new ArrayList<String>(majorityClasses1);
        List<String> maj2 = new ArrayList<String>(majorityClasses2);
        List<String> maj3 = new ArrayList<String>(majorityClasses3);

        List<String> index1 = Arrays.asList(maj1.toString());
        String[] booknamesArray1 = index1.get(0).split(", ");
        List<String> booknames1 = new ArrayList<>(Arrays.asList(booknamesArray1));

        List<String> index2 = Arrays.asList(maj2.toString());
        String[] booknamesArray2 = index2.get(0).split(", ");
        List<String> booknames2 = new ArrayList<>(Arrays.asList(booknamesArray2));

        List<String> index3 = Arrays.asList(maj3.toString());
        String[] booknamesArray3 = index3.get(0).split(", ");
        List<String> booknames3 = new ArrayList<>(Arrays.asList(booknamesArray3));

        List<String> ans1 = new ArrayList<String>();
        List<String> ans2 = new ArrayList<String>();
        List<String> ans3 = new ArrayList<String>();

        Random random = new Random();

        for(int i = 0 ; i < 2 ; i++) {
            if(booknames1.size() > 0) {
                String randomString1 = booknames1.remove(random.nextInt(booknames1.size()));
                ans1.add(randomString1);
            }
            if(booknames2.size() > 0) {
                String randomString2 = booknames2.remove(random.nextInt(booknames2.size()));
                ans2.add(randomString2);
            }
            if(booknames3.size() > 0) {
                String randomString3 = booknames3.remove(random.nextInt(booknames3.size()));
                ans3.add(randomString3);
            }
        }

        String listString1 = ans1.toString();
        listString1 = listString1.replace("[","").replace("]","");
        List<String> S1 = Arrays.asList(listString1.split(", "));

        String listString2 = ans2.toString();
        listString2 = listString2.replace("[","").replace("]","");
        List<String> S2 = Arrays.asList(listString2.split(", "));

        String listString3 = ans3.toString();
        listString3 = listString3.replace("[","").replace("]","");
        List<String> S3 = Arrays.asList(listString3.split(", "));

        System.out.println("--------");
        System.out.println(S1);
        System.out.println(S2);
        System.out.println(S3);

        List<String> booklist = new ArrayList<>();
        booklist.addAll(S1);
        booklist.addAll(S2);
        booklist.addAll(S3);

        return booklist;
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