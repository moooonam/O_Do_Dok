package com.ssafy.ododok.api.controller;

import java.io.*;
import java.sql.Date;
import java.sql.SQLException;
import java.util.Random;
import java.util.*;
import java.util.ArrayList;
import java.util.List;
import java.sql.*;

import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.apache.poi.ss.usermodel.*;


public class KNN_group {
    public static void Manage_Group() {
        String url = "jdbc:mysql://localhost:3306/test";
        String userName = "root";
        String password = "1111";

        // Back end ���� ������ sql id�� pw
        Connection conn = null;
        Statement state = null;

        try {
            conn = DriverManager.getConnection(url, userName, password);
            state = conn.createStatement();

            String sql;
            sql = "select * from new_table";

            ResultSet resultSet = state.executeQuery(sql);

            FileWriter writer = new FileWriter("output.csv");

            //ERD ���� �ʵ�� ȣ�� �������� ���� �ؾ� �� Field ������ ���� �ٶ�~~
            while (resultSet.next()) {
                int team_id = resultSet.getInt("team_id");
                int genre1 = resultSet.getInt("team_genre1");
                int genre2 = resultSet.getInt("team_genre2");
                int genre3 = resultSet.getInt("team_genre3");
                String team_name = resultSet.getString("team_name");

                writer.write(team_id + ", " + genre1 + ", " + genre2 + ", " + genre3 + ", " + team_name + "\n");
            }

            writer.close();

            resultSet.close();
            state.close();
            conn.close();

        } catch(SQLException | IOException e) {
            e.printStackTrace();
        }
        finally {
            try{
                if(state != null)
                    state.close();
            } catch(SQLException e){
                e.printStackTrace();
            }
            try{
                if(conn != null)
                    conn.close();
            }catch (SQLException e){

            }
        }
    }

    public static void main(String[] args) {
        Manage_Group();
        List<Point> dataset = readCSVFile("output.csv");

        Point testPoint = new Point(1,0,0, null);
        int K = 5;

        List<Point> neighbors = findNearestNeighbors(dataset, testPoint, K);

        List<String> majorityClasses = Collections.singletonList(getMajoriyClass(neighbors));

        List<String> maj = new ArrayList<String>(majorityClasses);

        List<String> index1 = Arrays.asList(maj.toString());
        String[] booknamesArray = index1.get(0).split(", ");
        List<String> booknames = new ArrayList<>(Arrays.asList(booknamesArray));

        List<String> ans = new ArrayList<String>();

        Random random = new Random();
        for(int i = 0 ; i < 5 ; i++) {
            String randomString = booknames.remove(random.nextInt(booknames.size()));
            ans.add(randomString);
        }

        String listString = ans.toString();
        listString = listString.replace("[","").replace("]","");
        List<String> S = Arrays.asList(listString.split(", "));

        System.out.println(S);
    }
    private static List<Point> findNearestNeighbors(List<Point> dataset, Point testPoint , int K) {
        PriorityQueue<PointDistance> pq = new PriorityQueue<>(Comparator.comparing(PointDistance::getDistance).reversed());

        for(Point p : dataset) {
            double distance = Math.sqrt(Math.pow(p.feature2 - testPoint.feature2, 2) + Math.pow(p.feature3 - testPoint.feature3, 2) + Math.pow(p.feature4 - testPoint.feature4, 2)
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
                Double feature2 = Double.parseDouble(row.get(1));
                Double feature3 = Double.parseDouble(row.get(2));
                Double feature4 = Double.parseDouble(row.get(3));
                //double feature5 = Double.parseDouble(row.get(4));

                if(feature3 == null) {
                    feature3 = 0.0;
                }
                else if(feature4 == null) {
                    feature4 = 0.0;
                }

                String label = row.get(4);

                dataset.add(new Point(feature2, feature3 , feature4, label));
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
        double feature4;
        //double feature5;
        String label;

        public Point( double feature2, double feature3,  double feature4, String label){
            //this.feature1 = feature1;
            this.feature2 = feature2*1;
            this.feature3 = feature3*0.2;
            this.feature4 = feature4*0.1;
            //this.feature5 = feature5;
            this.label = label;
        }

        public String toString() {
            return "(" +  feature2 + "," + feature3 + "," + feature4 + ")";
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
